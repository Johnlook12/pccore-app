import React, { useEffect, useState } from "react";
import { useUser } from '../hooks/useUser';
import { Link } from "react-router-dom";
import { ArrowUturnLeftIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import UserForm from "../components/UserForm";
import ModalWrapper from "../components/ModalWrapper";

export default function UsersPage() {
    const { findAll, deleteUser, loading: userLoading, error: userError } = useUser();
    const [currentUserId, setCurrentUserId] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showUpdateSucess, setShowUpdateSuccess] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await findAll();
                setUsuarios(users);
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
        fetchUsers();
    }, [showAddUser, showUpdateUser]);

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            if (!response) {
                console.log("Error al intentar eliminar el usuario");
            }
            const updatedUsers = await findAll();
            setUsuarios(updatedUsers);
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    const handleSubmit = () => {
        setShowAddUser(false);
    }

    const handleUpdate = (id) => {
        setCurrentUserId(id);
        setShowUpdateUser(true);
    }

    return (
        <div className="min-h-screen bg-[#333333] p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#C0C0C0]/20">
                    <h4 className="text-3xl font-bold text-[#00A3E0] flex items-center gap-2">
                        Gestión de Usuarios
                        <Link to="/admin" className="hover:opacity-80 transition-opacity">
                            <ArrowUturnLeftIcon className="w-8 h-8 text-[#C0C0C0]" />
                        </Link>
                    </h4>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowAddUser(true)}
                            className="bg-[#00A3E0] hover:bg-[#0093C7] text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 hover:shadow-[0_4px_15px_rgba(0,163,224,0.3)]"
                        >
                            Añadir Usuario
                        </button>
                        {showSuccess && (
                            <span className="text-[#00A3E0] font-semibold flex items-center gap-2">
                                ✓ Usuario añadido
                            </span>
                        )}
                        {showUpdateSucess && (
                            <span className="text-[#00A3E0] font-semibold flex items-center gap-2">
                                ✓ Usuario actualizado
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabla */}
                <div className="border border-[#C0C0C0]/20 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[#444444]">
                            <tr className="text-[#C0C0C0]">
                                <th className="px-6 py-4 text-left font-semibold">Nombre</th>
                                <th className="px-6 py-4 text-left font-semibold">Apellidos</th>
                                <th className="px-6 py-4 text-left font-semibold">Email</th>
                                <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        
                        <tbody className="divide-y divide-[#C0C0C0]/10">
                            {usuarios?.map((item, index) => (
                                <tr key={index} className="hover:bg-[#444444]/50 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{item.nombre}</td>
                                    <td className="px-6 py-4 text-[#C0C0C0]">{item.apellidos}</td>
                                    <td className="px-6 py-4 text-[#C0C0C0]">{item.email}</td>
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
                    
                    {userLoading && (
                        <div className="p-8 text-center text-[#C0C0C0]">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#00A3E0] rounded-full border-t-transparent"></div>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {showAddUser && (
                    <ModalWrapper title="Añadir usuario" onClose={() => setShowAddUser(false)}>
                        <UserForm onSubmit={handleSubmit} />
                    </ModalWrapper>
                )}
                
                {showUpdateUser && (
                    <ModalWrapper title="Actualizar usuario" onClose={() => setShowUpdateUser(false)}>
                        <UserForm 
                            typeAction="update" 
                            id={currentUserId} 
                            onSubmit={() => setShowUpdateUser(false)} 
                        />
                    </ModalWrapper>
                )}
            </div>
        </div>
    );
}