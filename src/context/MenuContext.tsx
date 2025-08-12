import React, { createContext, useState, useEffect, useContext } from 'react';
import { MenuItem, PartyOrderOption } from '../types/menuTypes.ts';
import { initialPartyOptions } from '../data/menuData.ts';

interface MenuContextType {
  menuItems: MenuItem[];
  partyOptions: PartyOrderOption[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  removeMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  addPartyOption: (option: Omit<PartyOrderOption, 'id'>) => void;
  updatePartyOption: (id: string, option: Partial<PartyOrderOption>) => void;
  removePartyOption: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load menu items from localStorage or use initial data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Load party options from localStorage or use initial data
  const [partyOptions, setPartyOptions] = useState<PartyOrderOption[]>(() => {
    const savedOptions = localStorage.getItem('crunchTimePartyOptions');
    if (savedOptions) {
      try {
        return JSON.parse(savedOptions);
      } catch {
        localStorage.removeItem('crunchTimePartyOptions');
      }
    }
    return initialPartyOptions;
  });

  // Load menu items from backend
  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch(() => setMenuItems([]));
  }, []);

  // Save party options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('crunchTimePartyOptions', JSON.stringify(partyOptions));
  }, [partyOptions]);

  // Add a new menu item
  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setMenuItems([...menuItems, newItem]);
  };

  // Update an existing menu item
  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    const updated = menuItems.map((menuItem) =>
      menuItem.id === id ? { ...menuItem, ...item } : menuItem
    );
    const current = updated.find((m) => m.id === id);
    await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    });
    setMenuItems(updated);
  };

  // Remove a menu item
  const removeMenuItem = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Toggle a menu item's availability
  const toggleItemAvailability = async (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    const updated = { ...item, available: !item.available };
    await fetch(`/api/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setMenuItems(menuItems.map((m) => (m.id === id ? updated : m)));
  };

  // Add a new party option
  const addPartyOption = (option: Omit<PartyOrderOption, 'id'>) => {
    const newOption: PartyOrderOption = {
      ...option,
      id: Date.now().toString(), // Generate a unique ID
    };
    setPartyOptions([...partyOptions, newOption]);
  };

  // Update an existing party option
  const updatePartyOption = (id: string, option: Partial<PartyOrderOption>) => {
    setPartyOptions(
      partyOptions.map((partyOption) =>
        partyOption.id === id ? { ...partyOption, ...option } : partyOption
      )
    );
  };

  // Remove a party option
  const removePartyOption = (id: string) => {
    setPartyOptions(partyOptions.filter((option) => option.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        partyOptions,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
        toggleItemAvailability,
        addPartyOption,
        updatePartyOption,
        removePartyOption,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the menu context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};