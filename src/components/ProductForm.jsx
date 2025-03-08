import React, { useEffect, useState } from "react";
import CategorySelect from './CategorySelect';
import { useCategory } from '../hooks/useCategory';
import { useProductsContext } from "../context/ProductsContext";
import { useProducts } from "../hooks/useProducts";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ProductForm({ onSubmit, typeAction, id }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const { categorias, getById, loading } = useCategory();
    const [isLoading, setIsLoading] = useState(false);
    const {findById} = useProducts(); // 
    const { addProduct, updateProduct, loading: prodLoading, error } = useProductsContext();

    useEffect(() => {
        if (typeAction === 'update' && id) {
            const fetchProduct = async () => {
                setIsLoading(true);
                try {
                    const product = await findById(id);
                    if (product) {
                        setNombre(product.nombre);
                        setDescripcion(product.descripcion);
                        setPrecio(product.precio);
                        setStock(product.stock);
                        setCategoriaId(product.categoria_id);
                    }
                } catch (error) {
                    console.log("Error al obtener el producto" + error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchProduct();
        }
    }, [id, typeAction]);


    const clearFields = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setCategoriaId('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('precio', precio);
        formData.append('stock', stock);
        formData.append('categoria_id', categoriaId);
        formData.append('image', selectedImage);
        try {
            if (typeAction === 'update') {
                const updatedProduct = await updateProduct(id, formData);
                onSubmit();
                clearFields();
                return;
            }
            const insertedProduct = await addProduct(formData);
            onSubmit();
            clearFields();
        } catch (error) {
            console.log("Error al añadir el producto" + error.message);
        }
    }

    if (loading || prodLoading || isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <div className="bg-[#333333] p-6 rounded-xl border border-[#C0C0C0]/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-500/20 text-red-300 px-4 py-3 rounded-lg">
                        {error.message}
                    </div>
                )}
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Nombre</label>
                    <input
                        className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#C0C0C0]">Precio</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]">€</span>
                            <input
                                className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 pl-8 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                                type="number"
                                step="0.01"
                                value={precio}
                                onChange={(e) => setPrecio(parseFloat(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2 mt-2">
                        <CategorySelect 
                            categorias={categorias} 
                            onChange={setCategoriaId} 
                            selectedCategory={categoriaId}
                            style="bg-[#444444] border-[#C0C0C0]/20 text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Stock</label>
                    <input
                        className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(parseFloat(e.target.value))}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Imagen</label>
                    <div className="relative group">
                        <div className={`flex flex-col items-center justify-center border-2 border-dashed ${
                            selectedImage ? 'border-[#00A3E0]' : 'border-[#C0C0C0]/40'
                        } rounded-lg p-6 transition-colors`}>
                            <ArrowUpTrayIcon className="w-8 h-8 text-[#C0C0C0] mb-2" />
                            <span className="text-sm text-[#C0C0C0] text-center">
                                {selectedImage ? selectedImage.name : 'Arrastra o haz click para subir'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#C0C0C0]">Descripción</label>
                    <textarea
                        rows={4}
                        className="w-full bg-[#444444] border border-[#C0C0C0]/20 rounded-lg px-4 py-3 text-white focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/50"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={prodLoading || isLoading}
                    className="w-full bg-[#00A3E0] hover:bg-[#0093C7] text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                    {prodLoading || isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : typeAction === 'update' ? (
                        'Actualizar Producto'
                    ) : (
                        'Añadir Producto'
                    )}
                </button>
            </form>
        </div>
    )
}