import { Briefcase, Bolt, Droplet, Hammer, LayoutGrid, Wrench, Image as ImageIcon } from 'lucide-react';


export const serviceCategories = [
  { name: 'Carpentry', icon: <Briefcase size={20} /> },
  { name: 'Painting', icon: <ImageIcon size={20} /> },
  { name: 'Electrical', icon: <Bolt size={20} /> }, // use Bolt instead of Flash
  { name: 'Plumbing', icon: <Droplet size={20} /> },
  { name: 'Masonry', icon: <Hammer size={20} /> },
  { name: 'Tiling', icon: <LayoutGrid size={20} /> },
  { name: 'Welding', icon: <Wrench size={20} /> },
];

// Paste your full mockServices array from the Word doc here...
export const mockServices = [
  {
    id: 's1',
    name: 'John Doe Carpentry',
    category: 'Carpentry',
    location: 'Perundurai',
    rating: 4.8,
    priceRange: '₹500 - ₹5000',
    description: 'Experienced carpenter specializing in custom furniture, cabinet installation, and general wood repairs.',
    contact: '9876543210',
    email: 'john.doe@example.com',
    workSamples: [
      'https://placehold.co/400x300/E0F2F7/000?text=Custom+Cabinetry',
      'https://placehold.co/400x300/E0F2F7/000?text=Deck+Repair',
      'https://placehold.co/400x300/E0F2F7/000?text=Furniture+Build'
    ],
    reviews: [
      { id: 'r1', user: 'Alice', rating: 5, comment: 'Excellent work!', date: '2024-07-20' },
      { id: 'r2', user: 'Bob', rating: 4, comment: 'Good quality.', date: '2024-07-15' }
    ],
    availability: 'Mon-Sat, 9 AM - 6 PM'
  },
  // ... more services
];
