import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function AddToCartButton({ product, quantity }) {
    const { cart, addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const inCart = cart.find(item => item.id === product.id);
    const disponible = product.stock - (inCart?.cantidad || 0);

const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(product, quantity);
    };

    return (
        <button
            onClick={handleAddToCart}
            type="button"
            disabled={!user || disponible === 0}
            className={`w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${!user || disponible === 0
                    ? 'bg-[#C0C0C0]/20 text-[#C0C0C0]/50 cursor-not-allowed'
                    : 'bg-[#00A3E0] hover:bg-[#0093C7] text-white hover:shadow-[0_4px_15px_rgba(0,163,224,0.3)] active:scale-95'
                }`}
            aria-label={!user ? 'Inicia sesión para comprar' : disponible === 0 ? 'Producto agotado' : `Añadir ${product.nombre} al carrito`}
        >
            {!user ? (
                'Inicia sesión para comprar'
            ) : disponible === 0 ? (
                'Agotado'
            ) : (
                <>
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>Añadir al carrito</span>
                </>
            )}
        </button>
    );
}
