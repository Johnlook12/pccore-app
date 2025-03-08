import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";
const ProductsContext = createContext();

export function ProductsProvider({children}){
    const {productos, addProduct, deleteProduct,updateProduct, loading, error, findById} = useProducts();

    return(
        <ProductsContext.Provider value={{productos, loading,updateProduct, error, addProduct, deleteProduct, findById}}>
            {children}
        </ProductsContext.Provider>
    );
}


export const useProductsContext = () => useContext(ProductsContext);