import React, { useState } from "react";
import { Input } from "../ui/input";
import ProductList from "./product-list";

type Product = {
  id: number;
  name: string;
  price: number;
};

interface SearchableProductListProps {
  products: Product[];
}

const SearchableProductList: React.FC<SearchableProductListProps> = ({
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default SearchableProductList;
