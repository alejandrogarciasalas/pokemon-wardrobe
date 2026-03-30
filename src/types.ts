export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'hat' | 'shirt' | 'pants' | 'accessory';
  imageUrl: string;
}

export interface Outfit {
  hat: ClothingItem | null;
  shirt: ClothingItem | null;
  pants: ClothingItem | null;
  accessory: ClothingItem | null;
}
