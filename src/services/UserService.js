const API_BASE_URL = "http://localhost:3001/usuarios"

export async function findAll(){
    try {
        const response = await fetch(API_BASE_URL);
        if(!response.ok){
            console.error("Error status: "+response.status);
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Fallo la solicitud: "+error.message);
        throw error;
    }
}

export async function add(usuario){
    try {
        const response = await fetch(API_BASE_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        if(!response.ok){
            console.error("Error status: "+response.status);
        }
    } catch (error) {
        console.error("Fallo la solicitud: "+error.message);
        throw error;
    }
}

export async function findById(id){
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`)
        if(!response.ok){
            console.error("Error status: "+response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo la solicitud: "+error.message);
        throw error;
    }
}