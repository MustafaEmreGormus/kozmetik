
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  benefits: string[];
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppSection {
  HOME = 'home',
  SHOP = 'shop',
  AI_CHEF = 'ai_chef',
  CUSTOM_MIX = 'custom_mix'
}
