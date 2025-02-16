import React from "react";
import { useProducts } from '../hooks/useProducts'
import { ProductList } from "../components/ProductList";
import banner1 from '../assets/img/banner1.jpg';

export function HomePage() {

    const { productos, loading, error } = useProducts();

    return (
        <div className="min-h-screen bg-fondo">
            <section className="relative h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{backgroundImage: `url(${banner1})`}}></div>
                <div className="relative z-10 text-center space-y-6">
                    <h1 className="text-5xl font-bold text-white">Tecnología de alto rendimiento</h1>
                    <button className="bg-[#00A3E0] text-white px-8 py-3 rounded-lg hover:bg-gray-400  transition-colors duration-500 hover:text-black cursor-pointer">Ver productos</button>
                </div>
            </section>

            <section className="px-4 py-12 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-[#00A3E0] mb-8 text-center">Productos destacados</h2>
            <ProductList productos={productos}/>
            </section>
        </div>
    )
}