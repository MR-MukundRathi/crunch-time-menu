import React, { useState } from 'react';
import { useMenu } from './context/MenuContext.tsx';
import MenuItemCard from './components/MenuItemCard.tsx';
import PartyOptionCard from './components/PartyOptionCard.tsx';
import AddItemForm from './components/AddItemForm.tsx';
import AddPartyOptionForm from './components/AddPartyOptionForm.tsx';
import EditItemForm from './components/EditItemForm.tsx';
import EditPartyOptionForm from './components/EditPartyOptionForm.tsx';
import { Link } from 'react-router-dom';
import { MenuItem, PartyOrderOption } from './types/menuTypes.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const { 
    menuItems, 
    partyOptions, 
    addMenuItem, 
    removeMenuItem, 
    toggleItemAvailability,
    addPartyOption,
    removePartyOption,
    updateMenuItem,
    updatePartyOption
  } = useMenu();
  
  // Function to explicitly save changes to localStorage
  const saveChanges = () => {
    localStorage.setItem('crunchTimeMenuItems', JSON.stringify(menuItems));
    localStorage.setItem('crunchTimePartyOptions', JSON.stringify(partyOptions));
    toast.success('Changes saved successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  const [activeTab, setActiveTab] = useState<'menu' | 'party'>('menu');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingPartyOption, setEditingPartyOption] = useState<PartyOrderOption | null>(null);
  
  // Group menu items by category
  const itemsByCategory = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);
  
  // Sort categories with 'Other' at the end
  const sortedCategories = Object.keys(itemsByCategory).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <ToastContainer aria-label="Toast Notifications" />
      <header style={{ 
        marginBottom: 24, 
        display: 'flex', 
        flexDirection: window.innerWidth < 600 ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: window.innerWidth < 600 ? 'flex-start' : 'center',
        gap: window.innerWidth < 600 ? 16 : 0
      }}>
        <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Crunch Time Admin</h1>
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 480 ? 'column' : 'row',
          gap: 12,
          width: window.innerWidth < 480 ? '100%' : 'auto'
        }}>
          <button
            onClick={saveChanges}
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: 4,
              fontSize: '0.9rem',
              background: '#4caf50',
              cursor: 'pointer',
              fontWeight: 600,
              width: window.innerWidth < 480 ? '100%' : 'auto'
            }}
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuthenticated');
              window.location.href = '/login';
            }}
            style={{
              textDecoration: 'none',
              color: '#f44336',
              padding: '8px 16px',
              border: '1px solid #f44336',
              borderRadius: 4,
              fontSize: '0.9rem',
              background: 'transparent',
              cursor: 'pointer',
              width: window.innerWidth < 480 ? '100%' : 'auto'
            }}
          >
            Logout
          </button>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              padding: '8px 16px',
              border: '1px solid #1976d2',
              borderRadius: 4,
              fontSize: '0.9rem',
              display: 'inline-block',
              textAlign: 'center',
              width: window.innerWidth < 480 ? '100%' : 'auto',
              boxSizing: 'border-box'
            }}
          >
            View Customer Menu
          </Link>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', marginBottom: 24, borderBottom: '1px solid #eee' }}>
        <button 
          onClick={() => setActiveTab('menu')} 
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'menu' ? '#f5f5f5' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'menu' ? '2px solid #1976d2' : 'none',
            cursor: 'pointer',
            fontWeight: activeTab === 'menu' ? 600 : 400
          }}
        >
          Menu Items
        </button>
        <button 
          onClick={() => setActiveTab('party')} 
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'party' ? '#f5f5f5' : 'transparent',
            border: 'none',
            borderBottom: activeTab === 'party' ? '2px solid #ff9800' : 'none',
            cursor: 'pointer',
            fontWeight: activeTab === 'party' ? 600 : 400
          }}
        >
          Party Options
        </button>
      </div>
      
      {/* Menu Items Tab */}
      {activeTab === 'menu' && (
        <div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Manage Menu Items</h2>
          {editingItem ? (
            <>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Edit Menu Item</h3>
              <EditItemForm 
                item={editingItem} 
                onUpdate={updateMenuItem} 
                onCancel={() => setEditingItem(null)} 
              />
            </>
          ) : (
            <AddItemForm onAdd={addMenuItem} />
          )}
          
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Current Menu Items</h3>
            
            {menuItems.length === 0 ? (
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
                <p>No menu items added yet. Add your first item above!</p>
              </div>
            ) : (
              <div>
                {sortedCategories.map(category => (
                  <div key={category} style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: 8, color: '#555' }}>{category}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {itemsByCategory[category].map((item) => (
                        <MenuItemCard 
                          key={item.id} 
                          item={item} 
                          isAdmin={true}
                          onToggleAvailability={toggleItemAvailability}
                          onRemove={removeMenuItem}
                          onEdit={setEditingItem}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Party Options Tab */}
      {activeTab === 'party' && (
        <div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 16 }}>Manage Party Options</h2>
          {editingPartyOption ? (
            <>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Edit Party Option</h3>
              <EditPartyOptionForm 
                option={editingPartyOption} 
                onUpdate={updatePartyOption} 
                onCancel={() => setEditingPartyOption(null)} 
              />
            </>
          ) : (
            <AddPartyOptionForm onAdd={addPartyOption} />
          )}
          
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Current Party Options</h3>
            
            {partyOptions.length === 0 ? (
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
                <p>No party options added yet. Add your first option above!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {partyOptions.map((option) => (
                  <PartyOptionCard 
                    key={option.id} 
                    option={option} 
                    isAdmin={true}
                    onRemove={removePartyOption}
                    onEdit={setEditingPartyOption}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <footer style={{ marginTop: 48, borderTop: '1px solid #eee', paddingTop: 16, textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
        <p>Crunch Time Admin Panel | © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
