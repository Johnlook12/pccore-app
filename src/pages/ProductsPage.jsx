import React, { useState } from "react";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { useCategory } from './../hooks/useCategory';
import CategorySelect from './../components/CategorySelect';

export default function ProductsPage() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState();
    const [stock, setStock] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

    const { categorias, loading } = useCategory();

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div className="justify-items-center min-h-screen">
            <div className="mt-40">
                <h4 className="inline text-blue-500 font-bold text-3xl">Gestión de productos
                    <Link to="/admin">
                        <ArrowTurnDownLeftIcon className="inline w-8 ml-0.5" />
                    </Link>
                </h4>
            </div>
            <div className="text-xl mt-20">
                <form className="space-y-8">
                    <div className="space-x-5">
                        <label>Nombre :</label>
                        <input className="border rounded-lg" type="text" name="nombre" id="nombre"></input>
                    </div>

                    <div className="space-x-5">
                        <label>Descripción :</label>
                        <input className="border rounded-lg" type="text" name="apellidos" id="apellidos"></input>

                    </div>

                    <div className="space-x-5">

                        <label>Precio :</label>
                        <input className="border rounded-lg" type="email" name="email" id="email"></input>
                    </div>

                    <div className="space-x-5">
                        <label>Stock :</label>
                        <input className="border rounded-lg" type="text" name="password" id="password"></input>

                    </div>
                    <div className="space-x-5">
                        <label className="">Categoría :</label>
                        <CategorySelect categorias={categorias} onChange={setCategoriaId} />
                    </div>
                    <div className="text-center">
                        <button className="bg-[#00a3e0] p-3 rounded-xl hover:bg-blue-300 transition-colors duration-300 cursor-pointer" type="submit">Añadir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}