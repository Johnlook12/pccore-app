import React, { useState } from "react";
import { findAll } from "../services/ProductoService";

export function HomePage() {
    const [productos, setProductos] = useState([]);
    setProductos(findAll);
    console.log(productos);

    return (
        <div className="min-h-screen bg-fondo">
            <section className="relative h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/1280/720')] bg-cover bg-center opacity-70"></div>
                <div className="relative z-10 text-center space-y-6">
                    <h1 className="text-5xl font-bold text-white">Tecnología de alto rendimiento</h1>
                    <button className="bg-[#00A3E0] text-white px-8 py-3 rounded-lg hover:bg-gray-400  transition-colors duration-500 hover:text-black cursor-pointer">Ver productos</button>
                </div>
            </section>

            <section className="px-4 py-12 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-[#00A3E0] mb-8 text-center">Productos destacados</h2>

            </section>
        </div>
    )
}