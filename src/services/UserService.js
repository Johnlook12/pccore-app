const API_BASE_URL = "http://localhost:3001/usuarios"

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
}

export async function findAll() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            console.error("Error status: " + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message);
        throw error;
    }
}

export async function add(usuario) {
    const token = getToken();
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })

        if (!response.ok) {
            console.error("Error status: " + response.status);
        }
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message);
        throw error;
    }
}

export async function findById(id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (!response.ok) {
            console.error("Error status: " + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message);
        throw error;
    }
}

export async function deleteUser(id) {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (!response.ok) {
            console.error("Error status: " + response.status);
        }
        return true;
    } catch (error) {
        console.error("Fallo la solicitud: " + error.message);
        throw error;
    }
}

export async function updateUser(id, user) {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            console.error("Error status: " + response.status);
        }
        return true;
    }
    catch (error) {
        console.error("Fallo la solicitud: " + error.message);
        throw error;
    }
}