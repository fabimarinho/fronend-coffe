import { Product } from '@/types';

export const products: Product[] = [
  // Bebidas
  {
    id: 'cafe-premium',
    name: 'Café Premium',
    description: 'Um café com aroma intenso e sabor marcante, feito com grãos selecionados.',
    price: 15.0,
    category: 'Bebidas',
    stock: 50,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'expresso',
    name: 'Expresso',
    description: 'Um café com sabor inesquecível, preparado na pressão ideal.',
    price: 8.0,
    category: 'Bebidas',
    stock: 30,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Expresso com leite vaporizado e espuma cremosa.',
    price: 12.0,
    category: 'Bebidas',
    stock: 25,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cafe-macchiato',
    name: 'Café Macchiato',
    description: 'Café manchado com leite vaporizado, equilibrio perfeito.',
    price: 10.0,
    category: 'Bebidas',
    stock: 20,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'afogato',
    name: 'Afogato',
    description: 'Expresso quente sobre sorvete de baunilha.',
    price: 14.0,
    category: 'Bebidas',
    stock: 15,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Leite vaporizado com chocolate belga derretido.',
    price: 11.0,
    category: 'Bebidas',
    stock: 20,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cafe-gelado',
    name: 'Café Gelado',
    description: 'Frappe de café refrescante, perfeito para dias quentes.',
    price: 9.0,
    category: 'Bebidas',
    stock: 25,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'leite-macchiato',
    name: 'Leite Macchiato',
    description: 'Leite vaporizado manchado com café expresso.',
    price: 11.5,
    category: 'Bebidas',
    stock: 18,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Doces
  {
    id: 'torta-morango',
    name: 'Torta de Morango',
    description: 'Deliciosa torta feita com morangos frescos e chantilly.',
    price: 16.0,
    category: 'Doces',
    stock: 8,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-chocolate',
    name: 'Torta de Chocolate',
    description: 'Fatia de torta de chocolate belga com chantilly.',
    price: 18.0,
    category: 'Doces',
    stock: 10,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-banana',
    name: 'Torta de Banana',
    description: 'Fatia de torta de banana com canela e açúcar mascavo.',
    price: 14.0,
    category: 'Doces',
    stock: 6,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-maca',
    name: 'Torta de Maçã',
    description: 'Fatia de torta de maçã com especiarias tradicionais.',
    price: 15.0,
    category: 'Doces',
    stock: 7,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-nozes',
    name: 'Torta de Nozes',
    description: 'Fatia de torta com nozes americanas e mel.',
    price: 20.0,
    category: 'Doces',
    stock: 5,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-abacaxi',
    name: 'Torta de Abacaxi',
    description: 'Fatia com torta de abacaxi caramelizado.',
    price: 13.0,
    category: 'Doces',
    stock: 8,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'torta-especial',
    name: 'Torta Especial da Casa',
    description: 'Fatia de torta especial com calda de chocolate e frutas vermelhas.',
    price: 22.0,
    category: 'Doces',
    stock: 4,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category && product.active);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.active && (
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    )
  );
}

