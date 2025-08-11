import React, { useState } from 'react';
import './App.css';
import { useMenu } from './context/MenuContext.tsx';
import MenuItemCard from './components/MenuItemCard.tsx';
import PartyOptionCard from './components/PartyOptionCard.tsx';

function App() {
  const { menuItems, partyOptions } = useMenu();
  const [showPartyOptions, setShowPartyOptions] = useState(false);
  
  // Filter available menu items
  const availableItems = menuItems.filter(item => item.available);
  
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
    <div className="App" style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Crunch Time</h1>
        <div style={{ fontSize: '1rem', color: '#666' }}>@ Aparna Serenity</div>
      </header>
      
      {/* Party Orders Banner */}
      <section 
        style={{ 
          background: '#ffe082', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 20,
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onClick={() => setShowPartyOptions(!showPartyOptions)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>🎉 Party Orders Available!</strong>
            <div style={{ fontSize: '0.95rem', marginTop: 4 }}>
              {showPartyOptions ? 'Click to hide options' : 'Click to view party pack options'}
            </div>
          </div>
          <div style={{ fontSize: '1.5rem' }}>
            {showPartyOptions ? '▲' : '▼'}
          </div>
        </div>
      </section>
      
      {/* Party Options Section */}
      {showPartyOptions && (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>Party Pack Options</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {partyOptions.map((option) => (
              <PartyOptionCard key={option.id} option={option} />
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: '0.95rem', color: '#666', padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
            <p>For party orders, please contact us at least 24 hours in advance.</p>
            <p>Minimum order quantities apply as specified above.</p>
          </div>
        </section>
      )}
      
      {/* Today's Menu Section */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: 12 }}>Today's Menu</h2>
        
        {availableItems.length === 0 ? (
          <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
            <p>No items available today. Please check back later!</p>
          </div>
        ) : (
          <>
            {sortedCategories.map(category => {
              const categoryItems = itemsByCategory[category].filter(item => item.available);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category} style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: '#555' }}>{category}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {categoryItems.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
        
        {/* Unavailable Items */}
        {menuItems.some(item => !item.available) && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: '#888' }}>Currently Unavailable</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {menuItems
                .filter(item => !item.available)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Footer with Contact Options */}
      <footer style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a 
            href="https://wa.me/919999999999" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              background: '#25D366', 
              color: '#fff', 
              padding: '12px 0', 
              borderRadius: 8, 
              textDecoration: 'none', 
              fontWeight: 600, 
              fontSize: '1.1rem',
              textAlign: 'center'
            }}
          >
            WhatsApp Us
          </a>
          <a 
            href="tel:9999999999" 
            style={{ 
              background: '#1976d2', 
              color: '#fff', 
              padding: '12px 0', 
              borderRadius: 8, 
              textDecoration: 'none', 
              fontWeight: 600, 
              fontSize: '1.1rem',
              textAlign: 'center'
            }}
          >
            Call Us
          </a>
        </div>
        <div style={{ marginTop: 24, fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
          © {new Date().getFullYear()} Crunch Time | Aparna Serenity
        </div>
      </footer>
    </div>
  );
}

export default App;
