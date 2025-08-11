import React, { useState } from 'react';
import { PartyOrderOption } from '../types/menuTypes.ts';

interface AddPartyOptionFormProps {
  onAdd: (option: Omit<PartyOrderOption, 'id'>) => void;
}

const AddPartyOptionForm: React.FC<AddPartyOptionFormProps> = ({ onAdd }) => {
  const [newOption, setNewOption] = useState<Omit<PartyOrderOption, 'id'>>({ 
    name: '', 
    description: '',
    minQuantity: 10,
    pricePerUnit: 0,
    unit: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setNewOption({ 
      ...newOption, 
      [name]: type === 'number' ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOption.name || !newOption.description || !newOption.unit || newOption.pricePerUnit <= 0 || newOption.minQuantity <= 0) {
      alert('Please fill in all required fields');
      return;
    }
    onAdd(newOption);
    setNewOption({ 
      name: '', 
      description: '',
      minQuantity: 10,
      pricePerUnit: 0,
      unit: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Name *</label>
          <input
            name="name"
            placeholder="Party pack name"
            value={newOption.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Minimum Quantity *</label>
          <input
            name="minQuantity"
            type="number"
            placeholder="Minimum quantity"
            value={newOption.minQuantity}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
            min="1"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Price Per Unit *</label>
          <input
            name="pricePerUnit"
            type="number"
            placeholder="Price per unit"
            value={newOption.pricePerUnit}
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
            placeholder="e.g., plates, pieces, platters"
            value={newOption.unit}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Image URL</label>
          <input
            name="image"
            placeholder="Image URL"
            value={newOption.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Description *</label>
          <textarea
            name="description"
            placeholder="Description of the party option"
            value={newOption.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd', minHeight: '60px' }}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        style={{
          background: '#ff9800',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Add Party Option
      </button>
    </form>
  );
};

export default AddPartyOptionForm;