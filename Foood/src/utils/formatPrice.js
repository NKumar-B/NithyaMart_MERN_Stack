// Formats a number as Indian Rupees, e.g. 149 -> "₹149"
export function formatPrice(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

export default formatPrice;
