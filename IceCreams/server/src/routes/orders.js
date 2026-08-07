import { Router } from 'express'
import Order from '../models/Order.js'

const router = Router()

// POST /api/orders  — create a pending order from the cart
router.post('/', async (req, res) => {
  try {
    const { items, subtotal, gst = 0, grandTotal } = req.body
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item' })
    }
    const order = await Order.create({ items, subtotal, gst, grandTotal })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message })
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message })
  }
})

// PATCH /api/orders/:id/pay — mark an order as paid
router.patch('/:id/pay', async (req, res) => {
  try {
    const { paymentMethod } = req.body
    if (!['upi', 'cash'].includes(paymentMethod)) {
      return res.status(400).json({ error: 'paymentMethod must be "upi" or "cash"' })
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentMethod, status: 'paid', paidAt: new Date() },
      { new: true }
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order', details: err.message })
  }
})

export default router
