import MainLayout from "@/layouts/main/main-layout"
import ProductPage from "@/layouts/products/products";

export default function Page() {
  const breadcrumbs = [
    {
      label: "Products",
      path: "/products"
    }
  ];
  
  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <ProductPage />
    </MainLayout>
  )
}
