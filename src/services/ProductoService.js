
const API_BASE_URL = "http://localhost:3001/productos";

export async function findAll(){
    try {
        const response = await fetch(API_BASE_URL);
        if(!response.ok){
            console.error("Error status: "+response.status);
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error("Fallo la solicitud: "+error.message)
        throw error;
    }
}

