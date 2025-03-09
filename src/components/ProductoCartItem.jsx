import { useCarrito } from './CarritoContext';

const Producto = ({ producto }) => {
  const { cart, addToCart } = useCarrito();
  const inCart = cart.find(item => item.id === producto.id);
  const disponible = producto.stock - (inCart?.cantidad || 0);

  return (
    <div>
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Disponible: {disponible}</p>
      <button 
        onClick={() => addToCart(producto)} 
        type='button'
        disabled={disponible === 0}
      >
        {disponible === 0 ? 'Agotado' : 'Añadir al carrito'}
      </button>
    </div>
  );
};

export default Producto;