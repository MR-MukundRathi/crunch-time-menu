export interface MenuItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  available: boolean;
  description?: string;
  category?: string;
}

export interface PartyOrderOption {
  id: string;
  name: string;
  description: string;
  minQuantity: number;
  pricePerUnit: number;
  unit: string;
  image?: string;
}