import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CategorySelect({ categorias, onChange, selectedCategory }) {
    const handleChange = (event) => {
        onChange(Number(event.target.value));
    };

    return (
        <div className="w-full relative">
            <label htmlFor="category" className="block ${style} text-sm font-medium mb-1">
                Categoría
            </label>
            <div className="relative">
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-2.5  rounded-lg bg-gray-700 appearance-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                >
                    <option value={0}>Todas las categorías</option>
                    {categorias.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                            className="checked:bg-blue-gray-600"
                        >
                            {item.nombre}
                        </option>
                    ))}
                </select>
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pt-5">
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>
            
            {!categorias && (
                <div className="absolute inset-0 bg-gray-50 rounded-lg flex items-center px-4 text-sm text-gray-500">
                    Cargando categorías...
                </div>
            )}
            
            {categorias?.length === 0 && (
                <div className="absolute inset-0 bg-gray-50 rounded-lg flex items-center px-4 text-sm text-red-500">
                    Error cargando categorías
                </div>
            )}
        </div>
    );
}