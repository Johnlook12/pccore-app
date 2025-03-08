import { useState, useEffect} from "react";
import { findAll, addProduct as addProductService, deleteProduct as deleteProductService, updateProduct as updateProductService, findById as findByIdService } from "../services/ProductoService";

export const useProducts = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const data = await findAll();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        setLoading(true);
        setError('');
        try {
            const createdProduct = await addProductService(product);
            fetchProducts();
            return createdProduct;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const findById = async (id) => {
        setLoading(true);
        setError('');
        try {
            const product = await findByIdService(id);
            return product;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true);
        setError('');
        try {
            const deletedProduct = await deleteProductService(id);
            fetchProducts();
            return deletedProduct;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    const updateProduct = async (id, product) => {
        setLoading(true);
        setError('');
        try {
            const updatedProduct = await updateProductService(id, product);
            fetchProducts();
            return updatedProduct;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { productos, findById, addProduct, updateProduct, deleteProduct, loading, error };
}