import React from "react";
import { useState, useMemo } from "react";
import PriceSlider from "../components/RangeSlider"
import { useCategory } from "../hooks/useCategory";
import { useProducts } from "../hooks/useProducts";
import CategorySelect from "../components/CategorySelect";
import { ProductList } from "../components/ProductList";
export default function ShopPage() {

    const [minPriceValue, setMinPriceValue] = useState(0);
    const [maxPriceValue, setMaxPriceValue] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const { productos, loading : prodLoading, error : prodError } = useProducts();
    const { categorias, loading : catLoading, error : catError } = useCategory();

    const filteredProducts = useMemo(() => {
        return productos.filter(producto => {
            const categoryValue = Number.parseInt(selectedCategory);
            const cumpleCategoria = categoryValue === 0 ||
                producto.categoria_id === categoryValue;

            console.log(selectedCategory);
            const cumpleMinPrice = minPriceValue ? producto.precio >= minPriceValue : true;
            const cumpleMaxPrice = maxPriceValue ? producto.precio <= maxPriceValue : true;

            return cumpleCategoria && cumpleMinPrice && cumpleMaxPrice;
        })
    }, [productos, selectedCategory, minPriceValue, maxPriceValue]);

    return (
        <section className="my-10 mx-20">
            <div className="mb-8 text-center">
                <h1 className="font-bold text-3xl text-[#00A3E0]">Nuestra tienda</h1>
                <p className="text-xl text-white">Encuentra los mejores componentes</p>
            </div>

            <div className="flex space-x-10 pl-15 mt-20">
                <div className="space-x-5">
                    <label>Precio mínimo </label>
                    <PriceSlider value={minPriceValue} min={0} max={1000} handleChange={setMinPriceValue} />
                </div>
                <div className="space-x-5">
                    <label htmlFor="maxPriceSlider">Precio máximo </label>
                    <PriceSlider value={maxPriceValue} min={0} max={1000} handleChange={setMaxPriceValue} />
                </div>
                <div>
                    <CategorySelect categorias={categorias} onChange={setSelectedCategory} />
                </div>
            </div>
            <div>
                <ProductList productos={filteredProducts} />
            </div>
        </section>
    )
}