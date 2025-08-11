import React, { useState } from 'react';
import { MenuItem } from '../types/menuTypes.ts';

interface AddItemFormProps {
  onAdd: (item: Omit<MenuItem, 'id'>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({ 
    name: '', 
    price: 0, 
    unit: '', 
    image: '', 
    available: true,
    description: '',
    category: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setNewItem({ 
      ...newItem, 
      [name]: type === 'number' ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.unit || newItem.price <= 0) {
      alert('Please fill in all required fields (name, price, unit)');
      return;
    }
    onAdd(newItem);
    setNewItem({ 
      name: '', 
      price: 0, 
      unit: '', 
      image: '', 
      available: true,
      description: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Name *</label>
          <input
            name="name"
            placeholder="Item name"
            value={newItem.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Price *</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
            min="1"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Unit *</label>
          <input
            name="unit"
            placeholder="e.g., per plate, per piece"
            value={newItem.unit}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Category</label>
          <input
            name="category"
            placeholder="e.g., Snacks, Main Course"
            value={newItem.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Image URL</label>
          <input
            name="image"
            placeholder="Image URL"
            value={newItem.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Description</label>
          <textarea
            name="description"
            placeholder="Brief description of the item"
            value={newItem.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd', minHeight: '60px' }}
          />
        </div>
      </div>
      <button
        type="submit"
        style={{
          background: '#4caf50',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;