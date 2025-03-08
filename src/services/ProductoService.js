const API_BASE_URL = "http://localhost:3001/productos";

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;

}

export async function findAll() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            console.error("Error status: " + response.status);
            throw new Error("Error al obtener los productos");
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message)
        throw error;
    }
}

export async function findById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            console.error("Error status: " + response.status);
            throw new Error("Error al obtener el producto");
        }
        const producto = await response.json();
        return producto;
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message)
        throw error;
    }
}

export async function addProduct(formData) {
    const token = getToken();
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            console.error("Error status: " + response.status);
            throw new Error("Error al añadir el producto");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la solicitud: " + error);
        throw error;
    }
}

export async function updateProduct(id, formData){
    const token  = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Bearer ${token}`
            },
            body:formData
        });

        if(!response.ok){
            console.log("Error status: "+response.status);
            throw new Error("Error al actualizar el producto");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error en la solicitud: "+error);
        throw error;
    }
}

export async function deleteProduct(id){
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response.ok){
            console.log("Error status: "+response.status);
            throw new Error("Error al eliminar el producto");
        }
        return true;
    } catch (error) {
        console.log("Error en la solicitud: "+error)
        throw error;
    }
}

