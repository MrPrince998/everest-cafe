export interface CoffeeItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export interface DrinkItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface OtherItem {
  id: string;
  name: string;
  price: number;
  image: string;
}
export const CATEGORIES = ["All Coffee", "Machiato", "Latte", "Americano"];

export const COFFEE_DATA: CoffeeItem[] = [
  {
    id: "1",
    name: "Caffè Latte",
    category: "Latte",
    tagline: "with Oat Milk",
    description:
      "A rich, creamy espresso-based drink with steamed oat milk, perfect for a smooth morning start.",
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Caramel Machiato",
    category: "Machiato",
    tagline: "with Caramel Sauce",
    description:
      "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.",
    price: 5.12,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Classic Americano",
    category: "Americano",
    tagline: "Pure Espresso",
    description:
      "Espresso shots topped with hot water to produce a light layer of crema, serving a bold, clean taste.",
    price: 3.85,
    rating: 4.5,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Honey Machiato",
    category: "Machiato",
    tagline: "with Wild Honey",
    description:
      "A delicate balance of robust espresso and sweetness from wild mountain honey, finished with silky foam.",
    price: 4.95,
    rating: 4.7,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop",
  },
];

export const DRINKS_DATA: DrinkItem[] = [
  {
    id: "d1",
    name: "Iced Matcha Latte",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "d2",
    name: "Fresh Orange Juice",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1000&auto=format&fit=crop",
  },
];

export const OTHERS_DATA: OtherItem[] = [
  {
    id: "o1",
    name: "Chocolate Croissant",
    price: 3.25,
    image:
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "o2",
    name: "Blueberry Muffin",
    price: 2.95,
    image:
      "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?q=80&w=1000&auto=format&fit=crop",
  },
];
