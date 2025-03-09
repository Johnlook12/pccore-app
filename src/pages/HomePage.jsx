import React, { useEffect, useMemo, useState } from "react";
import { ProductList } from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import banner1 from '../assets/img/banner1.jpg';
import banner2 from '../assets/img/banner2.jpg';
import banner3 from '../assets/img/banner3.jpg';
import { useProductsContext } from "../context/ProductsContext";

export function HomePage() {

    const { productos, loading, error } = useProductsContext();
    const [currentSlide, setCurrentSlide] = useState(0);
    const banners = [banner1, banner2, banner3];
    const navigate = useNavigate();

    const filteredProducts = useMemo(() => {
        return productos.slice(0, 4);
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const handleNavigateStore = () => {
        navigate('/tienda');
        window.scrollTo(0, 0);
    }

    return (
        <div className="min-h-screen bg-fondo">
            <section className="relative h-96 flex items-center justify-center">

                <div className="absolute inset-0">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${index === currentSlide ? 'opacity-70' : 'opacity-0'
                                }`}
                            style={{ backgroundImage: `url(${banner})` }}
                        />
                    ))}
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-white scale-125 ring-2 ring-blue-500'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            <section className="px-4 py-12 max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold  mb-4 relative pb-8">
                        Productos Destacados
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-blue-600 rounded-full"></span>
                    </h2>
                    <p className="text-lg">
                        Descubre nuestras herramientas más populares y mejor valoradas
                    </p>
                </div>
                <ProductList productos={filteredProducts} />

                <div className="mt-12 text-center">
                    <button
                        className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer"
                        onClick={handleNavigateStore}
                    >
                        Ver Todos los Productos
                    </button>
                </div>

            </section>
        </div>
    )
}