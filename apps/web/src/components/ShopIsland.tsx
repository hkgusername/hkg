import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Minus, Plus, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: "p1",
    name: "Minimal Notebook",
    price: 18,
    description:
      "A/5 dotted notebook, 160 pages, lay-flat binding. No branding except a subtle mark on the back.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80",
    category: "stationery",
  },
  {
    id: "p2",
    name: "Ceramic Pour-Over",
    price: 45,
    description:
      "Hand-thrown ceramic dripper. No two are exactly alike. Fits standard 02 filters.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    category: "kitchen",
  },
  {
    id: "p3",
    name: "Linen Tote",
    price: 32,
    description:
      "Heavy-weight natural linen. Inside pocket. Gets better with use.",
    image:
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&q=80",
    category: "accessories",
  },
  {
    id: "p4",
    name: "Brass Pen",
    price: 55,
    description:
      "Solid brass, machined to tight tolerances. Takes standard Schmidt refills.",
    image:
      "https://images.unsplash.com/photo-1586439497518-c71ac8b3a9a4?w=600&q=80",
    category: "stationery",
  },
  {
    id: "p5",
    name: "Beeswax Candle",
    price: 24,
    description: "100% beeswax. Burns clean for 60+ hours. Subtle honey scent.",
    image:
      "https://images.unsplash.com/photo-1602874801006-8d209e4a5c23?w=600&q=80",
    category: "home",
  },
  {
    id: "p6",
    name: "Merino Wool Beanie",
    price: 38,
    description:
      "100% extra-fine merino. One size. Three colors: slate, sand, black.",
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    category: "accessories",
  },
];

function CartDrawer({
  isOpen,
  onClose,
  items,
  total,
  updateQuantity,
  removeItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-neutral-900 border-l border-neutral-800 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-neutral-400" />
                <h2 className="text-base font-semibold text-white">Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <ShoppingBag className="h-12 w-12 text-neutral-700" />
                  <p className="text-neutral-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover brightness-75"
                      />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium text-white">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-neutral-600 hover:text-neutral-300 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-neutral-500">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded border border-neutral-700 p-0.5 hover:bg-neutral-800 transition-colors"
                          >
                            <Minus className="h-3 w-3 text-neutral-400" />
                          </button>
                          <span className="text-sm w-6 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded border border-neutral-700 p-0.5 hover:bg-neutral-800 transition-colors"
                          >
                            <Plus className="h-3 w-3 text-neutral-400" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-neutral-800 px-6 py-4 space-y-4">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full rounded-lg bg-white py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ShopIsland() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Shop
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            A small collection of things worth owning.
          </p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-neutral-900">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden"
          >
            <a href={`/product/${product.id}`} className="h-56 overflow-hidden block">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover brightness-75 transition-all duration-500 group-hover:brightness-90 group-hover:scale-105"
              />
            </a>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <a
                  href={`/product/${product.id}`}
                  className="text-sm font-semibold text-white hover:text-neutral-300 transition-colors"
                >
                  {product.name}
                </a>
                <span className="text-sm font-medium text-neutral-400 shrink-0">
                  ${product.price}
                </span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed flex-1 mb-4">
                {product.description}
              </p>
              <button
                onClick={() => addItem(product)}
                className="w-full rounded-lg border border-neutral-600 py-2 text-sm font-medium text-neutral-300 hover:border-white hover:text-white transition-colors"
              >
                Add to cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        total={total}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </>
  );
}
