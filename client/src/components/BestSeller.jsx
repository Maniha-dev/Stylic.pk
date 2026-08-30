import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
    return (
        <div className='mt-20'>
            <div className="text-center mb-8 md:mb-10">

                <p className="
                    text-sm
                    md:text-base
                    font-semibold
                    tracking-[0.25em]
                    text-[#D8B56A]
                    uppercase
                    mb-2
                ">
                    Our Bestsellers
                </p>

                <h2 className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-serif
                    font-medium
                    text-[#5A2850]
                ">
                    Most Loved Jewellery
                </h2>

            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default BestSeller