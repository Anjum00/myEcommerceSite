import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { addCart, removeCart } from '../Redux/Slices/CartSlice';
import { useState } from 'react';

function Product({ data }) {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    dispatch(addCart({ ...data, quantity }));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(removeCart(data.id));
    toast.error("Item Removed From Cart");
  }

  // Calculate the total price based on quantity
  const totalPrice = data.price * quantity;

  return (
    <div className='flex flex-col justify-between items-center p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out mt-0' style={{marginTop:10,marginLeft:10}}>
      {/* Product Title */}
      <h2 className='text-gray-800 font-bold text-lg text-center mb-2 truncate w-full'>{data.title}</h2>

      {/* Product Image */}
      <img className='w-30 h-30 object-cover mb-4' src={data.image} alt={data.title}  style={{ objectFit: 'contain' }} />

      {/* Product Description */}
      <p className='text-gray-600 text-sm text-center mb-4'>{data.description.split(" ").slice(0, 10).join(" ") + "..."}</p>

      {/* Product Price */}
      <p className='text-green-600 font-semibold text-lg mb-2'>₹{totalPrice.toFixed(2)}</p>

      {/* Quantity Controls */}
      <div className='flex items-center mb-4'>
        <button
          className='bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:bg-red-600'
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className='mx-4 text-lg font-medium'>{quantity}</span>
        <button
          className='bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:bg-green-600'
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>

      {/* Add/Remove Button */}
      <div className='w-full'>
        {
          cart.some((p) => p.id === data.id) ? (
            <button
              className='w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out'
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className='w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out'
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )
        }
      </div>
    </div>
  );
}

export default Product;
