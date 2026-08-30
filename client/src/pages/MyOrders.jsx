import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');

      console.log("My Orders API:", data);

      if (data.success) {
        setMyOrders(data.orders || []);
      } else {
        console.log("Orders API error:", data.message);
      }

    } catch (error) {
      console.log(
        "Fetch orders error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className='mt-16 pb-16'>

      <div className='flex flex-col items-end w-max mb-8'>
        <p className='section-heading uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.length === 0 ? (
        <p className='text-gray-500'>
          You don't have any orders yet.
        </p>
      ) : (
        myOrders.map((order, index) => (

          <div
            key={order._id || index}
            className='border border-accent-mauve/20 rounded-lg mb-10 p-4 py-5 max-w-4xl'
          >

            {/* ORDER HEADER */}
            <div className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col gap-2'>

              <span>
                Order ID: {order._id}
              </span>

              <span>
                Payment: {order.paymentType || 'JazzCash'}
              </span>

              <span>
                Total Amount: {currency}{order.amount}
              </span>

            </div>


            {/* ORDER ITEMS */}
            {(order.items || []).map((item, itemIndex) => {

              const product = item.product;

              return (
                <div
                  key={item._id || itemIndex}
                  className={`
                    relative
                    bg-bg-ivory
                    text-gray-500/70
                    ${order.items.length !== itemIndex + 1 ? 'border-b' : ''}
                    border-accent-mauve/20
                    flex flex-col
                    md:flex-row
                    md:items-center
                    justify-between
                    p-4
                    py-5
                    md:gap-16
                    w-full
                  `}
                >

                  {/* PRODUCT */}
                  <div className='flex items-center mb-4 md:mb-0'>

                    <div className='bg-primary/10 p-4 rounded-lg'>

                      {product?.image?.[0] ? (
                        <img
                          src={product.image[0]}
                          alt={product.name || 'Product'}
                          className='w-16 h-16 object-contain'
                        />
                      ) : (
                        <div className='w-16 h-16 flex items-center justify-center text-xs'>
                          No image
                        </div>
                      )}

                    </div>

                    <div className='ml-4'>

                      <h2 className='product-name text-gray-800'>
                        {product?.name || 'Product unavailable'}
                      </h2>

                      <p>
                        Category: {product?.category || 'N/A'}
                      </p>

                    </div>

                  </div>


                  {/* ORDER INFO */}
                  <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>

                    <p>
                      Quantity: {item.quantity || 1}
                    </p>

                    <p>
                      Status: {order.status || 'Pending'}
                    </p>

                    <p>
                      Date:{' '}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </p>

                  </div>


                  {/* PRICE */}
                  <p className='text-primary text-lg font-medium'>

                    Amount:{' '}
                    {currency}
                    {(product?.offerPrice || 0) * (item.quantity || 1)}

                  </p>

                </div>
              );
            })}

          </div>

        ))
      )}

    </div>
  );
};

export default MyOrders;