"use client";

import { Loader } from "~/components/custom-ui";
import ProductForm from "~/components/products/product-form";
import { useProduct } from "~/lib/hooks/use-product.hook";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const { data: productDetails, isLoading } = useProduct(params.productId);

  return isLoading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetails;
