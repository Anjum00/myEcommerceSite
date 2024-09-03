import React, { useState } from 'react';
import Product from './Product';
import Spinner from './Spinner';
import Cart from './Cart'
import eggImage2 from '../assets/eggImg2.jpg';
import gehuImg from '../assets/gehu.jpg';
import riceImg from '../assets/rice.jpg';
import tomatoes from '../assets/tomatoes.jpg';
import potatoImg from '../assets/potato.jpg';
import brinjalsImg from '../assets/brinjals.jpg';
import greenChilli from '../assets/greenChillies.jpg';
import garlicImg from '../assets/garlic.jpg';
import gingersImg from '../assets/gengers.jpg';

function Home() {
  const [loading, setLoading] = useState(false);
  const [ProductsData, setProductsData] = useState([
    {
      id: 1,
      title: 'Egg (अंडा)',
      price: 8,
      description: 'Per Peice',
      image: eggImage2, 
      category: 'Grocery',
    },
    {
      id: 2,
      title: 'wheat flour (गेहूं का आटा)',
      price: 35,
      description: 'Per KG',
      image: gehuImg,
      category: 'Grocery',
    },
    {
      id: 3,
      title: 'Rice (चावल)',
      price: 40,
      description: 'Per KG',
      image: riceImg,
      category: 'Grocery',
    },
    {
      id: 4,
      title: 'tomatoes (टमाटर)',
      price: 60,
      description: 'Per KG',
      image: tomatoes,
      category: 'Grocery',
    },
    {
      id: 5,
      title: 'Potato (आलू)',
      price: 40,
      description: 'Per KG',
      image: potatoImg,
      category: 'Grocery',
    },
    {
      id: 6,
      title: 'brinjals (बैगन)',
      price: 80,
      description: 'Per KG',
      image: brinjalsImg,
      category: 'Grocery',
    },
    {
      id: 7,
      title: 'green chilies (हरी मिर्च)',
      price: 100,
      description: 'Per KG',
      image: greenChilli,
      category: 'Grocery',
    },
    {
      id: 8,
      title: 'garlic  (लहसुन)',
      price: 250,
      description: 'Per KG',
      image: garlicImg,
      category: 'Grocery',
    },
    {
      id: 9,
      title: 'gingers  (अदरक)',
      price: 200,
      description: 'Per KG',
      image: gingersImg,
      category: 'Grocery',
    },
  ]);

  return (
    <div className=''>
      {
        loading ?
          (<Spinner />) :
          (ProductsData.length > 0 ?
            (
              <div className='grid xs:grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[30vh] '>
                {
                  ProductsData.map((data) => (
                    <Product key={data.id} data={data} />
                  ))
                }
              </div>
            ) :

            (<div className='h-[80vh] flex justify-center items-center'> 
              <p className='text-2xl font-semibold text-gray-800 italic'>No Data Found</p> 
            </div>)

          )
      }
    </div>
  );
}

export default Home;
