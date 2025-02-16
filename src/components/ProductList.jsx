import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductList({ productos }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((item) => (
                <ProductCard producto={item} />
            ))}
        </div>
    )
}