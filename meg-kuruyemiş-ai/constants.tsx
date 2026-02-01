
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lüks Karışık Kuruyemiş',
    category: 'Karışımlar',
    price: 185,
    unit: '500g',
    image: 'https://picsum.photos/seed/mix1/600/600',
    description: 'En seçkin fındık, fıstık ve bademlerin muhteşem buluşması.',
    benefits: ['Enerji deposu', 'Kalp dostu yağlar'],
    nutrients: { calories: 580, protein: 21, fat: 48 }
  },
  {
    id: '2',
    name: 'Kavrulmuş İç Antep Fıstığı',
    category: 'Fıstık',
    price: 240,
    unit: '250g',
    image: 'https://picsum.photos/seed/pistachio/600/600',
    description: 'Gaziantep\'in bereketli topraklarından taptaze.',
    benefits: ['Antioksidan zengini', 'B6 vitamini'],
    nutrients: { calories: 562, protein: 20, fat: 45 }
  },
  {
    id: '3',
    name: 'Çiğ İç Badem',
    category: 'Çiğ Ürünler',
    price: 160,
    unit: '500g',
    image: 'https://picsum.photos/seed/almond/600/600',
    description: 'Doğal haliyle korunan, vitamin deposu bademler.',
    benefits: ['E vitamini kaynağı', 'Magnezyum desteği'],
    nutrients: { calories: 579, protein: 21, fat: 49 }
  },
  {
    id: '4',
    name: 'Güneşte Kurutulmuş Kayısı',
    category: 'Kuru Meyveler',
    price: 95,
    unit: '500g',
    image: 'https://picsum.photos/seed/apricot/600/600',
    description: 'Malatya\'nın gün kurusu lezzeti.',
    benefits: ['Lif kaynağı', 'Demir desteği'],
    nutrients: { calories: 241, protein: 3, fat: 1 }
  },
  {
    id: '5',
    name: 'Kavrulmuş Kaju',
    category: 'Kaju',
    price: 195,
    unit: '400g',
    image: 'https://picsum.photos/seed/cashew/600/600',
    description: 'Kremamsı dokusu ve hafif tuzlu kavurmasıyla vazgeçilmez.',
    benefits: ['Çinko deposu', 'Kemik sağlığı'],
    nutrients: { calories: 553, protein: 18, fat: 44 }
  }
];

export const CATEGORIES = ['Tümü', 'Karışımlar', 'Fıstık', 'Çiğ Ürünler', 'Kuru Meyveler', 'Kaju'];
