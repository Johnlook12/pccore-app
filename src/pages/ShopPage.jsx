import React, { useState, useMemo } from "react";
import PriceSlider from "../components/RangeSlider";
import { useCategory } from "../hooks/useCategory";
import CategorySelect from "../components/CategorySelect";
import { ProductList } from "../components/ProductList";
import { useProductsContext } from "../context/ProductsContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ShopPage() {
    const [minPriceValue, setMinPriceValue] = useState(0);
    const [maxPriceValue, setMaxPriceValue] = useState(2000);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const { productos, loading: prodLoading, error: prodError } = useProductsContext();
    const { categorias, loading: catLoading, error: catError } = useCategory();

    const filteredProducts = useMemo(() => {
        return productos.filter(producto => {
            const categoryValue = Number.parseInt(selectedCategory);
            const cumpleCategoria = categoryValue === 0 || producto.categoria_id === categoryValue;
            const cumpleMinPrice = producto.precio >= minPriceValue;
            const cumpleMaxPrice = producto.precio <= maxPriceValue;

            return cumpleCategoria && cumpleMinPrice && cumpleMaxPrice;
        });
    }, [productos, selectedCategory, minPriceValue, maxPriceValue]);

    const resetFilters = () => {
        setMinPriceValue(0);
        setMaxPriceValue(2000);
        setSelectedCategory(0);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-[#00A3E0] mb-4 relative pb-8">
                    Nuestra Tienda
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-blue-600 rounded-full"></span>
                </h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Descubre nuestro catálogo completo de herramientas y componentes de alta calidad
                </p>
            </div>

            <div className="bg-[#444444] border-[#C0C0C0]/20 p-6 rounded-xl shadow-sm border border-gray-16 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                    <h3 className="text-lg font-semibold text-white">
                        Filtros
                        <span className="text-white ml-2 font-normal">
                            ({filteredProducts.length} productos)
                        </span>
                    </h3>
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 text-gray-200 hover:text-blue-300 font-medium transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                        Limpiar filtros
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">
                            Rango de precios
                        </label>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <PriceSlider
                                    value={minPriceValue}
                                    min={0}
                                    max={1000}
                                    handleChange={setMinPriceValue}
                                    label="Mínimo"
                                    currency="€"
                                />
                            </div>
                            <div className="space-y-2">
                                <PriceSlider
                                    value={maxPriceValue}
                                    min={0}
                                    max={2000}
                                    handleChange={setMaxPriceValue}
                                    label="Máximo"
                                    currency="€"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CategorySelect
                            categorias={categorias}
                            onChange={setSelectedCategory}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-12">
                {prodLoading || catLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                    </div>
                ) : prodError || catError ? (
                    <div className="text-center text-red-600 py-12">
                        Error cargando los productos
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-600 text-lg">
                            No se encontraron productos con los filtros actuales
                        </p>
                    </div>
                ) : (
                    <ProductList productos={filteredProducts} />
                )}
            </div>
        </section>
    );
}