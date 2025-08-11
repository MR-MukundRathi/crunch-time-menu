import React from 'react';
import { PartyOrderOption } from '../types/menuTypes.ts';

interface PartyOptionCardProps {
  option: PartyOrderOption;
  isAdmin?: boolean;
  onRemove?: (id: string) => void;
  onUpdate?: (id: string, option: Partial<PartyOrderOption>) => void;
  onEdit?: (option: PartyOrderOption) => void;
}

const PartyOptionCard: React.FC<PartyOptionCardProps> = ({
  option,
  isAdmin = false,
  onRemove,
  onUpdate,
  onEdit,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff8e1',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 1px 4px #0002',
        marginBottom: 16,
      }}
    >
      {option.image && (
        <img
          src={option.image}
          alt={option.name}
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            objectFit: 'cover',
            marginRight: 16,
          }}
        />
      )}
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{option.name}</div>
        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: 4 }}>
          {option.description}
        </div>
        <div style={{ color: '#888', fontSize: '0.95rem' }}>
          Minimum order: {option.minQuantity} {option.unit}
        </div>
        <div style={{ color: '#888', fontSize: '0.95rem' }}>
          ₹{option.pricePerUnit} per {option.unit.endsWith('s') ? option.unit.slice(0, -1) : option.unit}
        </div>
      </div>

      {isAdmin && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => onEdit?.(option)}
            style={{
              padding: '4px 8px',
              background: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onRemove?.(option.id)}
            style={{
              padding: '4px 8px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default PartyOptionCard;