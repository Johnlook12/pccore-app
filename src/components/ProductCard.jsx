import React from "react";

export function ProductCard({producto}){
    return(
        <div className="group relative border-transparent border hover:border-[#00A3E0] transition-colors duration-400 p-5 m-5 rounded-sm space-y-2">
            <h3 className="font-bold text-2xl">{producto.nombre}</h3>
            <p className="text-[#C0C0C0] font-bold text-lg">{producto.precio+" €"}</p>
            <button className="bg-[#00A3E0] rounded-lg p-2 mt-3">Ver detalles</button>
        </div>
    )
}