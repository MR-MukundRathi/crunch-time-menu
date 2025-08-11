import { MenuItem, PartyOrderOption } from '../types/menuTypes';

export const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Dhokla',
    price: 50,
    unit: 'per plate',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
    available: true,
    description: 'Soft and spongy savory cake made from fermented rice and chickpea flour',
    category: 'Snacks'
  },
  {
    id: '2',
    name: 'Samosa',
    price: 15,
    unit: 'per piece',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80',
    available: true,
    description: 'Crispy fried pastry with savory potato and pea filling',
    category: 'Snacks'
  },
  {
    id: '3',
    name: 'Kachori',
    price: 20,
    unit: 'per piece',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=200&q=80',
    available: true,
    description: 'Deep-fried bread stuffed with spicy lentil mixture',
    category: 'Snacks'
  },
  {
    id: '4',
    name: 'Pav Bhaji',
    price: 80,
    unit: 'per plate',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=200&q=80',
    available: false,
    description: 'Spicy vegetable curry served with buttered bread rolls',
    category: 'Main Course'
  },
];

export const initialPartyOptions: PartyOrderOption[] = [
  {
    id: '1',
    name: 'Dhokla Party Pack',
    description: 'Perfect for small gatherings. Includes mint chutney and tamarind sauce.',
    minQuantity: 10,
    pricePerUnit: 45,
    unit: 'plates',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Samosa Party Pack',
    description: 'Freshly fried samosas with mint and tamarind chutneys.',
    minQuantity: 20,
    pricePerUnit: 12,
    unit: 'pieces',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Mixed Snack Platter',
    description: 'Assortment of dhokla, samosa, and kachori. Great for parties!',
    minQuantity: 5,
    pricePerUnit: 150,
    unit: 'platters',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=200&q=80'
  }
];