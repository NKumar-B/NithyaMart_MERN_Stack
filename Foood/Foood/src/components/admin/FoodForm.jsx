import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import './FoodForm.css';

const emojiOptions = ['🍔', '🍕', '🍟', '🥖', '🧀', '🌯', '🥪', '🍗'];

export default function FoodForm({ initialValues, onSubmit, submitLabel = 'Save Food' }) {
  const [form, setForm] = useState(
    initialValues || {
      name: '',
      category: 'Veg',
      price: '',
      rating: 4.0,
      description: '',
      ingredients: '',
      image: '🍔',
      imageUrl: '',
      available: true,
      popular: false,
      featured: false,
    }
  );
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        ingredients: Array.isArray(form.ingredients)
          ? form.ingredients
          : form.ingredients.split(',').map((i) => i.trim()).filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <div className="food-form-grid">
        <div className="form-group">
          <label>Food Name</label>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Chicken Shawarma" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={form.category} onChange={(e) => update('category', e.target.value)}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input required type="number" min="1" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="149" />
        </div>

        <div className="form-group">
          <label>Rating (0–5)</label>
          <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update('rating', e.target.value)} />
        </div>

        <div className="form-group span-2">
          <label>Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Short, appetizing description shown on the food details page…"
          />
        </div>

        <div className="form-group span-2">
          <label>Ingredients (comma separated)</label>
          <input
            value={Array.isArray(form.ingredients) ? form.ingredients.join(', ') : form.ingredients}
            onChange={(e) => update('ingredients', e.target.value)}
            placeholder="Chicken, Bun, Cheese, Lettuce"
          />
        </div>

        <div className="form-group span-2">
          <label>Icon (emoji fallback)</label>
          <div className="emoji-picker">
            {emojiOptions.map((emoji) => (
              <button
                type="button"
                key={emoji}
                className={`emoji-option ${form.image === emoji ? 'emoji-option-active' : ''}`}
                onClick={() => update('image', emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group span-2">
          <label>Image URL</label>
          <input
            value={form.imageUrl}
            onChange={(e) => update('imageUrl', e.target.value)}
            placeholder="/src/assets/example.jpeg"
          />
        </div>

        <div className="form-group span-2 toggles">
          <label className="checkbox-label">
            <input type="checkbox" checked={form.available} onChange={(e) => update('available', e.target.checked)} />
            Available
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.popular} onChange={(e) => update('popular', e.target.checked)} />
            Popular
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
            Featured
          </label>
        </div>
      </div>

      <button className="btn btn-primary" type="submit" disabled={saving}>
        <FiSave /> {saving ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
