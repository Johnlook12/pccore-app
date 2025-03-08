import React from "react";
import { ArrowTopRightOnSquareIcon, WrenchIcon, UserGroupIcon, CubeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function AdminPanelPage() {
    return (
        <div className="min-h-screen bg-[#333333] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#00A3E0] mb-4 flex items-center justify-center">
                        <WrenchIcon className="w-12 h-12 mr-3" />
                        Panel de Administración
                    </h2>
                    <p className="text-[#C0C0C0] text-lg mt-2">
                        Gestión integral de la tienda y usuarios
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link 
                        to="/products"
                        className="group relative bg-[#444444] hover:bg-[#3a3a3a] border-2 border-[#C0C0C0]/20 rounded-xl p-8 transition-all duration-300 hover:border-[#00A3E0] hover:shadow-[0_0_25px_rgba(0,163,224,0.1)]"
                    >
                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-[#00A3E0]/10 rounded-full">
                                    <CubeIcon className="w-12 h-12 text-[#00A3E0]" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">
                                Gestión de Productos
                            </h3>
                            <p className="text-[#C0C0C0] mb-4">
                                Administra el inventario, precios y características de los productos
                            </p>
                            <div className="inline-flex items-center text-[#00A3E0] font-medium group-hover:text-[#00A3E0]/80 transition-colors">
                                Acceder
                                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
                            </div>
                        </div>
                    </Link>

                    <Link 
                        to="/users"
                        className="group relative bg-[#444444] hover:bg-[#3a3a3a] border-2 border-[#C0C0C0]/20 rounded-xl p-8 transition-all duration-300 hover:border-[#00A3E0] hover:shadow-[0_0_25px_rgba(0,163,224,0.1)]"
                    >
                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-[#00A3E0]/10 rounded-full">
                                    <UserGroupIcon className="w-12 h-12 text-[#00A3E0]" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">
                                Gestión de Usuarios
                            </h3>
                            <p className="text-[#C0C0C0] mb-4">
                                Administra permisos, roles y datos de los usuarios registrados
                            </p>
                            <div className="inline-flex items-center text-[#00A3E0] font-medium group-hover:text-[#00A3E0]/80 transition-colors">
                                Acceder
                                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
                            </div>
                        </div>
                    </Link>

                    <div className="group relative bg-[#444444] border-2 border-[#C0C0C0]/20 rounded-xl p-8 opacity-70 cursor-not-allowed">
                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 bg-[#C0C0C0]/10 rounded-full">
                                    <WrenchIcon className="w-12 h-12 text-[#C0C0C0]" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-[#C0C0C0] mb-2">
                                Nuevas Funcionalidades
                            </h3>
                            <p className="text-[#C0C0C0]/70 mb-4">
                                Próximamente más herramientas de administración
                            </p>
                            <span className="inline-flex items-center text-[#C0C0C0]/50 font-medium">
                                Disponible pronto
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-[#C0C0C0]/20 pt-8 text-center">
                    <p className="text-[#C0C0C0] text-sm">
                        Panel seguro • Último acceso: {(new Date()).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}