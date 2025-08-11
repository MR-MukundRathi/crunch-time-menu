import React from 'react';
import { MenuItem } from '../types/menuTypes.ts';

interface MenuItemCardProps {
  item: MenuItem;
  isAdmin?: boolean;
  onToggleAvailability?: (id: string) => void;
  onRemove?: (id: string) => void;
  onEdit?: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  isAdmin = false,
  onToggleAvailability,
  onRemove,
  onEdit,
}) => {
  // Check if we're on a mobile device (screen width < 480px)
  const isMobile = window.innerWidth < 480;
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile && isAdmin ? 'column' : 'row',
        alignItems: isMobile && isAdmin ? 'flex-start' : 'center',
        background: item.available ? '#fffde7' : '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 1px 4px #0001',
        opacity: item.available ? 1 : 0.7,
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        width: isMobile && isAdmin ? '100%' : 'auto',
        marginBottom: isMobile && isAdmin ? 12 : 0
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            objectFit: 'cover',
            marginRight: 16,
          }}
        />
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.name}</div>
          {item.description && (
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: 4 }}>
              {item.description}
            </div>
          )}
          <div style={{ color: '#888', fontSize: '0.95rem' }}>
            ₹{item.price} <span style={{ fontSize: '0.9rem' }}>/ {item.unit}</span>
          </div>
          {!item.available && !isAdmin && (
            <div style={{ color: '#e53935', fontSize: '0.9rem', fontWeight: 500 }}>
              Currently Unavailable
            </div>
          )}
        </div>
      </div>

      {isAdmin && (
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'row' : 'column', 
          gap: 8,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          marginTop: isMobile ? 8 : 0
        }}>
          <button
            onClick={() => onToggleAvailability?.(item.id)}
            style={{
              padding: '4px 8px',
              background: item.available ? '#e53935' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              flex: isMobile ? 1 : 'auto',
              marginRight: isMobile ? 4 : 0
            }}
          >
            {isMobile ? (item.available ? 'Unavailable' : 'Available') : (item.available ? 'Mark Unavailable' : 'Mark Available')}
          </button>
          <button
            onClick={() => onEdit?.(item)}
            style={{
              padding: '4px 8px',
              background: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              flex: isMobile ? 1 : 'auto',
              marginRight: isMobile ? 4 : 0
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onRemove?.(item.id)}
            style={{
              padding: '4px 8px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              flex: isMobile ? 1 : 'auto'
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;