import React, { useEffect, useState } from "react";
import { ArrowUturnLeftIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import ModalWrapper from "../components/ModalWrapper";
import ProductForm from "../components/ProductForm";
import { useCategory } from "../hooks/useCategory";
import { useProductsContext } from "../context/ProductsContext";
import ConfirmModal from "../components/ConfirmModal";

export default function ProductsPage() {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    const [currentProductId, setCurrentProductId] = useState('');
    const [productToDelete, setProductToDelete] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUpdateSucess, setShowUpdateSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { categorias } = useCategory();
    const { productos, loading, deleteProduct } = useProductsContext();

    const CategoryNameRow = ({ item }) => {
        const [catName, setCatName] = useState('');

        useEffect(() => {
            const cat = categorias.find(cat => cat.id === item.categoria_id);
            setCatName(cat?.nombre);
        }, [item.categoria_id]);
        return catName;
    }

    const handleSubmit = () => {
        setShowUpdateSuccess(false);
        setShowAddProduct(false);
        setShowSuccess(true);
    }


    const onClose = () => setShowConfirm(false);
    const onConfirm = () => deleteProduct(productToDelete);

    const handleDelete = (id) => {
        setShowSuccess(false);
        setShowUpdateSuccess(false);
        setProductToDelete(id);
        setShowConfirm(true);
    }

    const handleUpdate = (id) => {
        setCurrentProductId(id);
        setShowUpdateProduct(true);
    }

    const handleSubmitUpdate = () => {
        setShowSuccess(false);
        setShowUpdateProduct(false);
        setShowUpdateSuccess(true);
    }

    return (
        <div className="min-h-screen bg-[#333333] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#C0C0C0]/20">
                    <h4 className="text-3xl font-bold text-[#00A3E0] flex items-center gap-2">
                        Gestión de Productos
                        <Link to="/admin" className="hover:opacity-80 transition-opacity">
                            <ArrowUturnLeftIcon className="w-8 h-8 text-[#C0C0C0]" />
                        </Link>
                    </h4>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowAddProduct(true)}
                            className="bg-[#00A3E0] hover:bg-[#0093C7] text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 hover:shadow-[0_4px_15px_rgba(0,163,224,0.3)]"
                        >
                            Añadir Producto
                        </button>
                        {showSuccess && (
                            <span className="text-[#00A3E0] font-semibold flex items-center gap-2">
                                ✓ Producto añadido
                            </span>
                        )}
                        {showUpdateSucess && (
                            <span className="text-[#00A3E0] font-semibold flex items-center gap-2">
                                ✓ Producto actualizado
                            </span>
                        )}
                    </div>
                </div>

                <div className="border border-[#C0C0C0]/20 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[#444444]">
                            <tr className="text-[#C0C0C0]">
                                <th className="px-6 py-4 text-left font-semibold">Nombre</th>
                                <th className="px-6 py-4 text-left font-semibold">Precio</th>
                                <th className="px-6 py-4 text-left font-semibold">Categoría</th>
                                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                                <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-[#C0C0C0]/10">
                            {productos.map((item, index) => (
                                <tr key={index} className="hover:bg-[#444444]/50 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{item.nombre}</td>
                                    <td className="px-6 py-4 text-[#00A3E0]">€{item.precio}</td>
                                    <td className="px-6 py-4 text-[#C0C0C0]">
                                        <CategoryNameRow item={item} />
                                    </td>
                                    <td className="px-6 py-4 text-[#C0C0C0]">{item.stock}</td>
                                    <td className="px-6 py-4 flex items-center gap-4">
                                        <button 
                                            onClick={() => handleUpdate(item.id)}
                                            className="text-[#C0C0C0] hover:text-[#00A3E0] transition-colors p-2 rounded-lg hover:bg-[#00A3E0]/10"
                                        >
                                            <PencilSquareIcon className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="text-[#C0C0C0] hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                                        >
                                            <TrashIcon className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {loading && (
                        <div className="p-8 text-center text-[#C0C0C0]">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#00A3E0] rounded-full border-t-transparent"></div>
                        </div>
                    )}
                </div>

                {showAddProduct && (
                    <ModalWrapper title="Añadir producto" onClose={() => setShowAddProduct(false)}>
                        <ProductForm onSubmit={handleSubmit} />
                    </ModalWrapper>
                )}
                
                {showUpdateProduct && (
                    <ModalWrapper title="Actualizar producto" onClose={() => setShowUpdateProduct(false)}>
                        <ProductForm onSubmit={handleSubmitUpdate} id={currentProductId} typeAction="update" />
                    </ModalWrapper>
                )}
                
                {showConfirm && (
                    <ConfirmModal 
                        onClose={onClose} 
                        onConfirm={onConfirm} 
                        header="¿Eliminar producto?" 
                        content="Esta acción no se puede deshacer"
                    />
                )}
            </div>
        </div>
    )
}