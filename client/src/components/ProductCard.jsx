import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {

    const {
        currency,
        addToCart,
        removeFromCart,
        cartItems,
        navigate
    } = useAppContext()

    return product && (
        <div
            onClick={() => {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                scrollTo(0, 0)
            }}
            className="group bg-white border border-accent-mauve/10 rounded-xl overflow-hidden w-full max-w-64 shadow-sm hover:shadow-md transition duration-300"
        >

            {/* PRODUCT IMAGE */}
            <div className="relative bg-gray-50 h-52 md:h-56 flex items-center justify-center overflow-hidden">

                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                />

                {/* Wishlist */}
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-primary transition"
                >
                    ♡
                </button>

            </div>

            {/* PRODUCT DETAILS */}
            <div className="px-4 pt-4 pb-4">

                {/* CATEGORY */}
                <p className="text-[11px] uppercase tracking-[1.5px] text-gray-400 mb-1">
                    {product.category}
                </p>

                {/* PRODUCT NAME */}
                <p className="product-name text-gray-800 text-base md:text-lg font-medium truncate w-full">
                    {product.name}
                </p>

                {/* STARS */}
                <div className="flex items-center gap-0.5 mt-2">

                    {Array(5).fill('').map((_, i) => (
                        <img
                            key={i}
                            className="w-3.5 h-3.5"
                            src={
                                i < 4
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt=""
                        />
                    ))}

                    <p className="text-gray-400 text-xs ml-1">
                        (4)
                    </p>

                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-3">

                    <p className="text-primary text-lg md:text-xl font-medium">
                        {currency}{product.offerPrice}
                    </p>

                    <p className="text-gray-400 text-xs md:text-sm line-through">
                        {currency}{product.price}
                    </p>

                </div>

                {/* ADD TO CART */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 w-full"
                >

                    {!cartItems[product._id] ? (

                        <button
                            onClick={() => addToCart(product._id)}
                            className="w-full h-10 bg-primary text-white rounded-md flex items-center justify-center gap-2 text-sm font-medium cursor-pointer hover:bg-primary-dull transition"
                        >
                            <img
                                src={assets.cart_icon}
                                alt="cart"
                                className="w-4 h-4 brightness-0 invert"
                            />

                            ADD TO CART
                        </button>

                    ) : (

                        <div className="w-full h-10 bg-primary/10 rounded-md flex items-center justify-between px-3 select-none">

                            <button
                                onClick={() => removeFromCart(product._id)}
                                className="cursor-pointer text-primary text-lg px-2"
                            >
                                -
                            </button>

                            <span className="text-primary font-medium">
                                {cartItems[product._id]}
                            </span>

                            <button
                                onClick={() => addToCart(product._id)}
                                className="cursor-pointer text-primary text-lg px-2"
                            >
                                +
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}

export default ProductCard