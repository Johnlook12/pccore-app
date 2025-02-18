import { useState, useEffect } from 'react';
import { findAll } from '../services/CategoryService';

export const useCategory = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await findAll();
                setCategorias(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);
    
    return { categorias, loading, error };
}