import React, { useState, useEffect } from 'react';
import { PartyOrderOption } from '../types/menuTypes.ts';

interface EditPartyOptionFormProps {
  option: PartyOrderOption;
  onUpdate: (id: string, option: Partial<PartyOrderOption>) => void;
  onCancel: () => void;
}

const EditPartyOptionForm: React.FC<EditPartyOptionFormProps> = ({ option, onUpdate, onCancel }) => {
  const [editedOption, setEditedOption] = useState<Partial<PartyOrderOption>>({ ...option });

  useEffect(() => {
    setEditedOption({ ...option });
  }, [option]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setEditedOption({ 
      ...editedOption, 
      [name]: type === 'number' ? Number(value) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedOption.name || !editedOption.description || !editedOption.unit || 
        (editedOption.pricePerUnit && editedOption.pricePerUnit <= 0) || 
        (editedOption.minQuantity && editedOption.minQuantity <= 0)) {
      alert('Please fill in all required fields');
      return;
    }
    onUpdate(option.id, editedOption);
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
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Name *</label>
          <input
            name="name"
            placeholder="Party pack name"
            value={editedOption.name}
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
            value={editedOption.minQuantity}
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
            value={editedOption.pricePerUnit}
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
            value={editedOption.unit}
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
            value={editedOption.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / span 2' }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem' }}>Description *</label>
          <textarea
            name="description"
            placeholder="Description of the party option"
            value={editedOption.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: 4, border: '1px solid #ddd', minHeight: '60px' }}
            required
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
            background: '#ff9800',
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

export default EditPartyOptionForm;