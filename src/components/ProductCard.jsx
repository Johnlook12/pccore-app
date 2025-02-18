import React, { useEffect, useState } from "react";
import defaultImage from "../assets/img/default-image.jpg";

export function ProductCard({producto}){
    const [imagen, setImagen] = useState(defaultImage);

    useEffect(() =>{
        const cargarImagen = async () =>{
            try {
                const imagenImportada = await import(
                    `../assets/products/${producto.id}.jpg`
                );
                setImagen(imagenImportada.default);
            } catch (error) {
                setImagen(defaultImage);
            }
        }
        cargarImagen();
    },[producto.id])
    return(
        <div className="group relative border-transparent border hover:border-[#00A3E0] transition-colors duration-400 p-5 m-5 rounded-sm space-y-2">
            <img src={imagen} alt={producto.nombre} className="rounded-2xl" />
            <h3 className="font-bold text-2xl">{producto.nombre}</h3>
            <p className="text-[#C0C0C0] font-bold text-lg">{producto.precio+" €"}</p>
            <button className="bg-[#00A3E0] rounded-lg p-2 mt-3">Ver detalles</button>
        </div>
    )
}