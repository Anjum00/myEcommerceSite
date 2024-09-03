import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import axios from 'axios';

function Cart() {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', address: '', number: '' });

  useEffect(() => {
    const total = cart.reduce((prevValue, currValue) => {
      return prevValue + (currValue.price * currValue.quantity);
    }, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleCheckOut = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleConfirmOrder = () => {
    if (userDetails.name && userDetails.email && userDetails.address && userDetails.number) {
      const cartItems = cart.map(item => ({
        title: item.title,
        quantity: item.quantity
      }));
  
      axios.post('http://localhost:3001/send-email', {
        name: userDetails.name,
        email: userDetails.email,
        totalAmount: totalAmount.toFixed(2),
        cartItems
      })
        .then(response => {
          alert('Order Confirmed and email sent!');
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert('Failed to confirm order and send email.');
        });
    } else {
      alert('Please fill in all fields.');
    }
  };
  

  return (
    <div>
      {
        cart.length > 0 ?
          (<div className='xs:grid xs:grid-cols-1 md:flex md:justify-center md:items-center gap-80 mt-10'>
            <div>
              {cart.map((data, index) => (
                <CartItem key={data.id} data={data} itemIndex={index} />
              ))}
            </div>

            <div className='flex flex-col gap-14 md:gap-y-[350px] mb-10'>
              <div>
                <h2 className='text-[30px] text-green-500 font-bold text-center md:text-left'>Your Cart</h2>
                <h1 className='text-[40px] text-green-500 font-extrabold mt-[-16px] text-center md:text-left'>Summary</h1>
                <p className='text-lg text-gray-700 font-bold text-center md:text-left'> Total Items : {cart.length} </p>
              </div>

              <div>
                <p>
                  <span className='text-lg text-gray-800 font-bold text-center md:text-left'> Total Amount : <span className='text-green-500'> ₹{totalAmount.toFixed(2)} </span> </span>
                </p>
                <button
                  className='w-[400px] h-10 p-3 flex justify-center items-center font-bold text-white bg-green-600 hover:bg-green-700 transition-all duration-200 mt-4 rounded-md'
                  onClick={handleCheckOut}
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>) :
          (<div className='h-[80vh] flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-semibold text-gray-800 italic mb-4'> Empty Cart </h1>
            <NavLink to={'/'}>
              <button className='text-white bg-blue-600 rounded-full font-semibold text-[12px] p-2 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in'> Shop Now </button>
            </NavLink>
          </div>)
      }

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Your Order</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="number"
              name="number"
              placeholder="Mobile-Number"
              value={userDetails.number}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              required
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
