import React, { createContext, useState, useEffect, useContext } from 'react';
import { MenuItem, PartyOrderOption } from '../types/menuTypes.ts';
import { initialMenuItems, initialPartyOptions } from '../data/menuData.ts';

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const savedItems = localStorage.getItem('crunchTimeMenuItems');
    if (savedItems) {
      try {
        return JSON.parse(savedItems);
      } catch {
        // Remove corrupted data so the app can recover gracefully
        localStorage.removeItem('crunchTimeMenuItems');
      }
    }
    return initialMenuItems;
  });

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

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('crunchTimeMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  // Save party options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('crunchTimePartyOptions', JSON.stringify(partyOptions));
  }, [partyOptions]);

  // Add a new menu item
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(), // Generate a unique ID
    };
    setMenuItems([...menuItems, newItem]);
  };

  // Update an existing menu item
  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems(
      menuItems.map((menuItem) =>
        menuItem.id === id ? { ...menuItem, ...item } : menuItem
      )
    );
  };

  // Remove a menu item
  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Toggle a menu item's availability
  const toggleItemAvailability = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
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