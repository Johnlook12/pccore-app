import { useState, useEffect } from 'react';
import { findAll, findById } from '../services/CategoryService';

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

    const getById = async (id)=>{
        setLoading(true);
        setError('');
        try {
            const data = await findById(id);
            return data;
        } catch (error) {
            setError(error);
        } finally{
            setLoading(false);
        }
    }
    
    return { categorias, getById, loading, error };
}