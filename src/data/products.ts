export type Product = {
  id: number;
  name: string;
  category: "Bebidas" | "Doces";
  price: number;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Café Premium",
    category: "Bebidas",
    price: 15.0,
    description: "Um café com aroma intenso e sabor marcante.",
  },
  {
    id: 2,
    name: "Torta de Morango",
    category: "Doces",
    price: 12.0,
    description: "Deliciosa torta feita com morangos frescos.",
  },
  {
    id: 3,
    name: "Expresso",
    category: "Bebidas",
    price: 15.0,
    description: "Um café com sabor inesquecível.",
  },
  {
    id: 4,
    name: "Torta de Chocolate",
    category: "Doces",
    price: 12.5,
    description: "Fatia de torta de chocolate grego, com chantilly.",
  },
  {
    id: 5,
    name: "Capuccino",
    category: "Bebidas",
    price: 7.0,
    description: "Expresso com leite vaporizado.",
  },
  {
    id: 6,
    name: "Torta de Banana",
    category: "Doces",
    price: 9.0,
    description: "Fatia de torta de banana com canela.",
  },
  {
    id: 7,
    name: "Afogato",
    category: "Bebidas",
    price: 9.0,
    description: "Expresso com sorvete.",
  },
  {
    id: 8,
    name: "Torta de Maçã",
    category: "Doces",
    price: 11.0,
    description: "Fatia de torta de maçã do nordeste brasileiro.",
  },
  {
    id: 9,
    name: "Café Macchiato",
    category: "Bebidas",
    price: 6.5,
    description: "Café manchado com leite vaporizado.",
  },
  {
    id: 10,
    name: "Torta de Nozes",
    category: "Doces",
    price: 14.0,
    description: "Fatia de torta com nozes americanas.",
  },
  {
    id: 11,
    name: "Chocolate Quente",
    category: "Bebidas",
    price: 8.0,
    description: "Leite vaporizado com manchas de chocolate.",
  },
  {
    id: 12,
    name: "Café Gelado",
    category: "Bebidas",
    price: 6.0,
    description: "Frappe de café.",
  },
  {
    id: 13,
    name: "Torta de Abacaxi",
    category: "Doces",
    price: 8.0,
    description: "Fatia de torta de abacaxi caramelizado.",
  },
  {
    id: 14,
    name: "Leite Macchiado",
    category: "Bebidas",
    price: 7.5,
    description: "Leite vaporizado, manchado com café.",
  },
  {
    id: 15,
    name: "Torta Especial",
    category: "Doces",
    price: 14.5,
    description: "Fatia de torta americana, com calda de chocolate.",
  },
];
