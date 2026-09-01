import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);

  // JazzCash is the only payment method
  const paymentOption = "JazzCash";

  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);

      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }

    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get('/api/address/get');

      if (data.success) {
        setAddresses(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      const { data } = await axios.post('/api/order/cod', {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
        paymentType: paymentOption,
      });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate('/my-orders');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">

      {/* CART ITEMS */}
      <div className='flex-1 max-w-4xl'>

        <h1 className="section-heading mb-6">
          Shopping Cart
          <span className="text-sm text-primary font-body">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >

            <div className="flex items-center md:gap-6 gap-3">

              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-accent-mauve/30 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>

              <div>

                <p className="hidden md:block font-display text-[1.8rem] leading-[1.05] tracking-[-0.02em] text-gray-800">
                  {product.name}
                </p>

                <div className="font-normal text-gray-500/70">

                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>

                  <div className='flex items-center'>
                    <p>Qty:</p>

                    <select
                      onChange={(e) =>
                        updateCartItem(
                          product._id,
                          Number(e.target.value)
                        )
                      }
                      value={cartItems[product._id]}
                      className='outline-none'
                    >
                      {Array(
                        cartItems[product._id] > 9
                          ? cartItems[product._id]
                          : 9
                      )
                        .fill('')
                        .map((_, index) => (
                          <option
                            key={index}
                            value={index + 1}
                          >
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>

                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className='inline-block w-6 h-6'
              />
            </button>

          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            className='group-hover:-translate-x-1 transition'
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>

      </div>

      {/* ORDER SUMMARY */}
      <div className="max-w-[360px] w-full bg-accent-mauve/10 p-5 max-md:mt-16 border border-accent-mauve/20">

        <h2 className="text-xl md:text-xl font-medium">
          Order Summary
        </h2>

        <hr className="border-accent-mauve/20 my-5" />

        {/* DELIVERY ADDRESS */}
        <div className="mb-6">

          <p className="eyebrow-label text-primary">
            Delivery Address
          </p>

          <div className="relative flex justify-between items-start mt-2">

            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-bg-ivory border border-accent-mauve/20 text-sm w-full">

                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-accent-mauve/10 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>

              </div>
            )}

          </div>

          {/* PAYMENT METHOD */}
          <p className="eyebrow-label text-primary mt-6">
            Payment Method
          </p>

          <div className="mt-2 w-full border border-accent-mauve/30 bg-bg-ivory px-4 py-3 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary"></div>

              <span className="text-gray-700 font-medium">
                JazzCash
              </span>
            </div>

            <span className="text-xs text-green-600 font-medium">
              Available
            </span>

          </div>

          {/* JAZZCASH DETAILS */}
          <div className="mt-4 rounded-md border border-accent-mauve/30 bg-white/60 p-4 text-sm text-gray-600">

            <p className="eyebrow-label text-primary mb-2">
              JazzCash Payment
            </p>

            <p className="text-gray-700">
              Send payment to:
            </p>

            <p className="mt-2 text-lg font-semibold text-primary">
              03334567069
            </p>

            <p className="mt-2 text-xs text-gray-500">
              After sending the payment, please send the payment screenshot
              on WhatsApp for order confirmation.
            </p>

            <a
              href="https://wa.me/03216609565"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-primary hover:underline font-medium"
            >
              Send Payment Screenshot on WhatsApp →
            </a>

          </div>

        </div>

        <hr className="border-accent-mauve/20" />

        {/* TOTAL */}
        <div className="text-gray-500 mt-4 space-y-2">

          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">
              Free
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {getCartAmount() * 2 / 100}
            </span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>

            <span>
              {currency}
              {getCartAmount() + getCartAmount() * 2 / 100}
            </span>
          </p>

        </div>

        {/* PLACE ORDER */}
        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          Place Order
        </button>

      </div>

    </div>
  ) : null;
};

export default Cart;