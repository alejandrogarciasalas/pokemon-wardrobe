import type { ClothingItem } from '../types';

// Placeholder clothing items - will generate actual images with DALL-E 3
export const clothingItems: ClothingItem[] = [
  // Hats
  { id: 'hat-none', name: 'None', category: 'hat', imageUrl: '' },
  { id: 'hat-baseball', name: 'Baseball Cap', category: 'hat', imageUrl: '/clothing/hats/baseball.png' },
  { id: 'hat-beanie', name: 'Beanie', category: 'hat', imageUrl: '/clothing/hats/beanie.png' },
  { id: 'hat-tophat', name: 'Top Hat', category: 'hat', imageUrl: '/clothing/hats/tophat.png' },
  { id: 'hat-crown', name: 'Crown', category: 'hat', imageUrl: '/clothing/hats/crown.png' },
  { id: 'hat-party', name: 'Party Hat', category: 'hat', imageUrl: '/clothing/hats/party.png' },
  { id: 'hat-chef', name: 'Chef Hat', category: 'hat', imageUrl: '/clothing/hats/chef.png' },
  { id: 'hat-pirate', name: 'Pirate Hat', category: 'hat', imageUrl: '/clothing/hats/pirate.png' },
  
  // Shirts
  { id: 'shirt-none', name: 'None', category: 'shirt', imageUrl: '' },
  { id: 'shirt-tshirt', name: 'T-Shirt', category: 'shirt', imageUrl: '/clothing/shirts/tshirt.png' },
  { id: 'shirt-hoodie', name: 'Hoodie', category: 'shirt', imageUrl: '/clothing/shirts/hoodie.png' },
  { id: 'shirt-suit', name: 'Suit Jacket', category: 'shirt', imageUrl: '/clothing/shirts/suit.png' },
  { id: 'shirt-sweater', name: 'Sweater', category: 'shirt', imageUrl: '/clothing/shirts/sweater.png' },
  { id: 'shirt-tank', name: 'Tank Top', category: 'shirt', imageUrl: '/clothing/shirts/tank.png' },
  { id: 'shirt-jersey', name: 'Jersey', category: 'shirt', imageUrl: '/clothing/shirts/jersey.png' },
  { id: 'shirt-cape', name: 'Cape', category: 'shirt', imageUrl: '/clothing/shirts/cape.png' },
  
  // Pants
  { id: 'pants-none', name: 'None', category: 'pants', imageUrl: '' },
  { id: 'pants-jeans', name: 'Jeans', category: 'pants', imageUrl: '/clothing/pants/jeans.png' },
  { id: 'pants-shorts', name: 'Shorts', category: 'pants', imageUrl: '/clothing/pants/shorts.png' },
  { id: 'pants-dress', name: 'Dress Pants', category: 'pants', imageUrl: '/clothing/pants/dress.png' },
  { id: 'pants-skirt', name: 'Skirt', category: 'pants', imageUrl: '/clothing/pants/skirt.png' },
  { id: 'pants-sweatpants', name: 'Sweatpants', category: 'pants', imageUrl: '/clothing/pants/sweatpants.png' },
  
  // Accessories
  { id: 'acc-none', name: 'None', category: 'accessory', imageUrl: '' },
  { id: 'acc-glasses', name: 'Sunglasses', category: 'accessory', imageUrl: '/clothing/accessories/glasses.png' },
  { id: 'acc-scarf', name: 'Scarf', category: 'accessory', imageUrl: '/clothing/accessories/scarf.png' },
  { id: 'acc-bowtie', name: 'Bow Tie', category: 'accessory', imageUrl: '/clothing/accessories/bowtie.png' },
  { id: 'acc-backpack', name: 'Backpack', category: 'accessory', imageUrl: '/clothing/accessories/backpack.png' },
];

export const getItemsByCategory = (category: string) => {
  return clothingItems.filter(item => item.category === category);
};
