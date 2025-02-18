import React from "react";

export default function CategorySelect({categorias, onChange}){

    const handleChange = (event) =>{
        const value = event.target.value;
        onChange(value);
    }

    return(
        <div className="inline">
            <select name="category" id="category" className="bg-[#333333] transition-colors focus:border-blue-400 duration-250 hover:border-blue-400 p-2 border border-gray-900 rounded-lg text-sm" onChange={handleChange}>
                <option value={0}>Seleccionar categoría</option>
                {categorias.map((item,index) => (
                    <option key={index} value={item.id}>{item.nombre}</option>
                ))}
            </select>
        </div>
    )
}