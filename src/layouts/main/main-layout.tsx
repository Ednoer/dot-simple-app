import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useCartStore } from "../products/products";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export interface MainLayoutProps {
    children: ReactNode;
    breadcrumbs: { label: string; path: string }[];
}

export default function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart, addToCart, removeFromCart } = useCartStore();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.replace("/auth/login");
        }
    }, []);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbs.map((item, index) => (
                                        <Fragment key={index}>
                                            <BreadcrumbItem>
                                                {index === breadcrumbs.length - 1 ? (
                                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={item.path}>
                                                        {item.label}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {
                                                index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />
                                            }
                                        </Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div>
                            <Button variant="outline" onClick={() => setIsCartOpen(true)}>
                                <ShoppingCart /> Keranjang {" "} <Badge
                                    variant="secondary"
                                    className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                                >
                                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                </Badge>
                            </Button>
                        </div>
                    </header>
                    <div className="flex flex-col gap-4 p-4 w-full">{children}</div>
                </SidebarInset>
            </SidebarProvider>

            {/* Cart */}
            <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DrawerContent>
                    <div className="p-4">
                        <DrawerTitle>Keranjang Belanja</DrawerTitle>
                        <div className="mt-4">
                            {cart.length === 0 ? (
                                <p>Keranjang kosong</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center mb-2">
                                        <div>
                                            <span>{item.title} - ${item.price} x {item.quantity}</span>
                                            <p className="text-sm font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>-</Button>
                                            <Button variant="outline" size="sm" onClick={() => addToCart(item)}>+</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
