import express from 'express';

const router = express.Router();

// In-memory order storage
const ordersStore = [];

// Promo code list
const PROMO_CODES = {
  'SPORT20': { discount: 0.20, description: '20% Off SportGear Special' },
  'FREESHIP': { discount: 0.00, freeShipping: true, description: 'Free Express Shipping' },
  'APEX10': { discount: 0.10, description: '10% Off First Purchase' },
};

// POST /api/orders/validate-coupon
router.post('/validate-coupon', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const promo = PROMO_CODES[code.trim().toUpperCase()];
  if (promo) {
    return res.json({
      success: true,
      code: code.toUpperCase(),
      discount: promo.discount,
      freeShipping: promo.freeShipping || false,
      description: promo.description,
    });
  } else {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code. Try "SPORT20"' });
  }
});

// POST /api/orders/checkout - Process order & generate receipt
router.post('/checkout', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode, giftWrap } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email || !shippingAddress.address) {
      return res.status(400).json({ success: false, message: 'Incomplete shipping details provided' });
    }

    // Calculate Subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply Coupon
    let discountAmount = 0;
    let freeShippingApplied = false;

    if (couponCode && PROMO_CODES[couponCode.toUpperCase()]) {
      const promo = PROMO_CODES[couponCode.toUpperCase()];
      discountAmount = subtotal * (promo.discount || 0);
      if (promo.freeShipping) freeShippingApplied = true;
    }

    const shippingFee = (subtotal > 100 || freeShippingApplied) ? 0 : 7.99;
    const taxFee = Number(((subtotal - discountAmount) * 0.08).toFixed(2));
    const totalAmount = Number((subtotal - discountAmount + shippingFee + taxFee).toFixed(2));

    // Generate Order ID & Tracking Number
    const orderId = 'APEX-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'TRK-SPORTS-' + Math.floor(10000000 + Math.random() * 90000000);

    const newOrder = {
      orderId,
      trackingNumber,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Confirmed & Processing',
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      summary: {
        subtotal: Number(subtotal.toFixed(2)),
        discount: Number(discountAmount.toFixed(2)),
        shipping: shippingFee,
        tax: taxFee,
        total: totalAmount,
      },
    };

    ordersStore.push(newOrder);

    // Simulate instant success payment
    res.status(201).json({
      success: true,
      message: 'Order processed successfully!',
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error processing order', error: err.message });
  }
});

// GET /api/orders/:orderId - Retrieve order details
router.get('/:orderId', (req, res) => {
  const order = ordersStore.find((o) => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order receipt not found' });
  }
  res.json({ success: true, order });
});

export default router;