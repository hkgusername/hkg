import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, X, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

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

export default function ProductCart({ product }: { product: Product }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

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

  const handleAdd = () => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-neutral-700">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2.5 text-neutral-500 hover:text-white transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium text-white">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2.5 text-neutral-500 hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex-1 rounded-lg bg-white py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors"
        >
          {added ? "Added!" : "Add to cart"}
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 rounded-lg border border-neutral-700 px-3 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-neutral-900">
              {itemCount}
            </span>
          )}
        </button>
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
