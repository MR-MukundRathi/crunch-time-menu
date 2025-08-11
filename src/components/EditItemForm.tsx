import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types/menuTypes.ts';

interface EditItemFormProps {
  item: MenuItem;
  onUpdate: (id: string, item: Partial<MenuItem>) => void;
  onCancel: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onUpdate, onCancel }) => {
  const [editedItem, setEditedItem] = useState<Partial<MenuItem>>({ ...item });

  useEffect(() => {
    setEditedItem({ ...item });
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setEditedItem({ 
      ...editedItem, 
      [name]: type === 'number' ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedItem.name || !editedItem.unit || (editedItem.price && editedItem.price <= 0)) {
      alert('Please fill in all required fields (name, price, unit)');
      return;
    }
    onUpdate(item.id, editedItem);
  };

  // Check if we're on a mobile device (screen width < 480px)
  const isMobile = window.innerWidth < 480;
  
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: 12, 
        marginBottom: 12 
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Name *</label>
          <input
            name="name"
            placeholder="Item name"
            value={editedItem.name}
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
            value={editedItem.price}
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
            value={editedItem.unit}
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
            value={editedItem.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Image URL</label>
          <input
            name="image"
            placeholder="Image URL"
            value={editedItem.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Description</label>
          <textarea
            name="description"
            placeholder="Brief description of the item"
            value={editedItem.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd', minHeight: '60px' }}
          />
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 10 
      }}>
        <button
          type="submit"
          style={{
            background: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 600,
            marginBottom: isMobile ? 10 : 0
          }}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#9e9e9e',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditItemForm;