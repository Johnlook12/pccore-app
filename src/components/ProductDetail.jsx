import React, { useState, useEffect } from 'react';
import { ArrowUturnLeftIcon} from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import defaultImage from '../assets/img/default-image.jpg';
import { useProductsContext } from '../context/ProductsContext';
import { useCategory } from '../hooks/useCategory';
import { AddToCartButton } from './AddToCartButton';

export default function ProductDetail() {
    const { id } = useParams();
    const { findById } = useProductsContext();
    const { categorias } = useCategory();
    const [producto, setProducto] = useState(null);
    const [imagen, setImagen] = useState(defaultImage);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await findById(id);
                setProducto(product);

                try {
                    const imageModule = await import(`../assets/products/${id}.jpg`);
                    setImagen(imageModule.default);
                } catch {
                    setImagen(defaultImage);
                }

            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, []);

    const handleQuantity = (operation) => {
        setQuantity(prev => {
            if (operation === 'increment' && prev < producto.stock) return prev + 1;
            if (operation === 'decrement' && prev > 1) return prev - 1;
            return prev;
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#333333] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00A3E0] border-t-transparent"></div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="min-h-screen bg-[#333333] flex items-center justify-center text-[#C0C0C0]">
                Producto no encontrado
            </div>
        );
    }

    const categoryName = categorias.find(cat => cat.id === producto.categoria_id)?.nombre || 'Sin categoría';

    return (
        <div className="min-h-screen bg-[#333333] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link
                    to="/tienda"
                    className="inline-flex items-center mb-8 text-[#C0C0C0] hover:text-[#00A3E0] transition-colors"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
                    Volver a la tienda
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-[#444444] rounded-xl p-6 border-2 border-[#C0C0C0]/20">
                        <img
                            src={imagen}
                            alt={producto.nombre}
                            className="w-full h-96 object-contain rounded-xl"
                        />
                    </div>

                    <div className="text-[#C0C0C0]">
                        <h1 className="text-4xl font-bold text-white mb-4">{producto.nombre}</h1>

                        <div className="mb-8">
                            <span className="text-3xl font-bold text-[#00A3E0]">
                                €{producto.precio.toFixed(2)}
                            </span>
                            <span className="ml-4 text-sm bg-[#00A3E0]/20 text-[#00A3E0] px-3 py-1 rounded-full">
                                {categoryName}
                            </span>
                        </div>

                        <div className="mb-8">

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-[#C0C0C0]/20 rounded-lg">
                                    <button
                                        onClick={() => handleQuantity('decrement')}
                                        className="px-4 py-2 text-white hover:bg-[#00A3E0]/10 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 text-white">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantity('increment')}
                                        className="px-4 py-2 text-white hover:bg-[#00A3E0]/10 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <AddToCartButton product={producto} quantity={quantity}/>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Descripción</h3>
                            <p className="leading-relaxed">{producto.descripcion}</p>
                        </div>

                        <div className="border-t border-[#C0C0C0]/20 pt-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Especificaciones técnicas</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-[#C0C0C0]">Categoría</span>
                                    <p className="text-white">{categoryName}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-[#C0C0C0]">SKU</span>
                                    <p className="text-white">#{producto.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}