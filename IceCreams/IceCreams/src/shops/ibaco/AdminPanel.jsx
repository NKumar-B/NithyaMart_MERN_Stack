import React, { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './ibaco.api';
import sampleItems from './sampleData';
import './ibaco.css';

const emptyForm = {
  name: '', category: 'tub', price: '', size: '', image: '', description: '', isVeg: true, inStock: true
};

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.warn('Using sample data (backend not reachable):', err.message);
      setItems(sampleItems);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateItem(editingId, form);
      } else {
        await createItem(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadItems();
    } catch (err) {
      alert('Backend not connected yet — connect /api/ibaco routes to save changes.');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      loadItems();
    } catch (err) {
      alert('Backend not connected yet — connect /api/ibaco routes to delete items.');
    }
  };

  return (
    <div className="ibaco-admin">
      <h2>Ibaco Admin Panel</h2>

      <form className="ibaco-admin-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="tub">Tub</option>
          <option value="scoop">Scoop</option>
          <option value="sundae">Sundae</option>
          <option value="cone">Cone</option>
          <option value="bar">Bar</option>
          <option value="shake">Shake</option>
          <option value="cake">Cake</option>
          <option value="combo">Combo</option>
        </select>
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="size" placeholder="Size (e.g. 500ml)" value={form.size} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <label><input type="checkbox" name="isVeg" checked={form.isVeg} onChange={handleChange} /> Veg</label>
        <label><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} /> In Stock</label>
        <button className="ibaco-btn" type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
      </form>

      <table className="ibaco-admin-table">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>{item.inStock ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
