import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useState } from "react";
import { Eye, ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = Product & { quantity: number };

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

export default function ProductPage() {
  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useCartStore();

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <Card key={product.id} className="p-2">
            <CardContent className="p-2">
              <div className="h-[220px] flex flex-col items-center justify-center">
                <img src={product.image} alt={product.title} className="w-full h-auto max-h-40 object-contain rounded-lg bg-white" />
              </div>
              <CardTitle className="mt-2 truncate">{product.title}</CardTitle>
              <p className="text-sm text-gray-500">${product.price}</p>
              <div className="mt-2 flex md:flex-row flex-col gap-2">
                <Button className="w-full" onClick={() => addToCart(product)} size="sm">Add to Cart</Button>
                <Button variant="outline" onClick={() => setSelectedProduct(product)} size="sm">Lihat Detail</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Produk */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent>
          <DialogTitle>{selectedProduct?.title}</DialogTitle>
          {selectedProduct && (
            <>
              <div className="h-[280px] flex flex-col items-center justify-center">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-auto max-h-60 object-contain rounded-lg bg-white" />
              </div>
              <div className="text-2xl font-bold text-gray-500">${selectedProduct.price}</div>
              <p className="text-gray-500">{selectedProduct.description}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)} size="sm">Tutup</Button>
                <Button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} size="sm">
                  Tambah ke Keranjang
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
