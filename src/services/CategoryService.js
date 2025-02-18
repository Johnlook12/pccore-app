const API_BASE_URL = "http://localhost:3001/categorias";

export async function findAll(){
    try {
        const response = await fetch(API_BASE_URL);
        
        if(!response.ok){
            console.error("Error status: "+response.status);
        }
        const categorias = response.json();
        return categorias;
    } catch (error) {
        console.error("Fallo la solicitud: "+error.message);
        throw error;        
    }
}