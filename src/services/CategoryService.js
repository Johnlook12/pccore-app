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

export async function findById(id){
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if(!response.ok){
            console.log("Error status: "+response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fallo en la solciitud: '+error);
        throw error;
    }
}