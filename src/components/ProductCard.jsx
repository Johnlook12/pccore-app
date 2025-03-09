import React, { useEffect, useState } from "react";
import defaultImage from "../assets/img/default-image.jpg";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ producto }) {
    const [imagen, setImagen] = useState(defaultImage);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { cart} = useCart();
    const inCart = cart.find(item => item.id === producto.id);
    const disponible = producto.stock - (inCart?.cantidad || 0);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarImagen = async () => {
            try {
                const imagenImportada = await import(
                    `../assets/products/${producto.id}.jpg`
                );
                const img = new Image();
                img.src = imagenImportada.default;
                img.onload = () => {
                    setImagen(imagenImportada.default);
                    setImageLoaded(true);
                };
            } catch (error) {
                setImagen(defaultImage);
                setImageLoaded(true);
            }
        }
        cargarImagen();
    }, [producto.id]);


    return (
        <div className="group relative bg-[#333333] border-2 border-[#C0C0C0]/10 hover:border-[#00A3E0]/30 transition-all duration-300 p-4 rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
            
            <div className="absolute top-3 left-3 z-10 flex gap-2">
                {disponible > 0 ? (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        disponible < 5 
                            ? 'bg-red-500/40 text-black' 
                            : 'bg-[#00A3E0]/20 text-[#00A3E0]'
                    }`}>
                        {disponible} en stock
                    </span>
                ) : (
                    <span className="bg-[#C0C0C0]/20 text-[#C0C0C0] px-2 py-1 text-xs font-semibold rounded-full">
                        Agotado
                    </span>
                )}
            </div>

            <div className="relative overflow-hidden rounded-xl aspect-square mb-4 bg-[#444444]">
                <img 
                    src={imagen} 
                    alt={producto.nombre}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    } ${imageLoaded && 'group-hover:scale-105'}`}
                />
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-[#444444] animate-pulse"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <h3 className="font-bold text-white text-lg truncate mb-1">
                {producto.nombre}
            </h3>
            <div className="flex items-center gap-2 mb-4">
                {producto.precioOriginal && (
                    <span className="text-[#C0C0C0] text-sm line-through">
                        €{producto.precioOriginal}
                    </span>
                )}
                <p className="text-[#00A3E0] font-bold text-xl">
                    €{producto.precio}
                </p>
            </div>

<AddToCartButton product={producto} quantity={1}></AddToCartButton>

            <Link to={`/producto/${producto.id}`} className="w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all" aria-label="Ver detalles">
                Detalles
            </Link>
        </div>
    )
}
