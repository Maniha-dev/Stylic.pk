import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 md:mt-20 px-4 sm:px-6 lg:px-8">

      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-10">

        <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-[#D8B56A] uppercase mb-2">
          Shop By Category
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#5A2850]">
          Explore Our Collections
        </h2>

      </div>


      {/* Categories */}
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4
        sm:gap-5
        lg:gap-6
        max-w-7xl
        mx-auto
      ">

        {categories.map((category, index) => (

          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="
              group
              cursor-pointer
              overflow-hidden
              rounded-2xl
              bg-[#FFFDF8]
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            {/* Image Area */}
            <div
              className="
                w-full
                aspect-[4/3]
                flex
                items-center
                justify-center
                overflow-hidden
                p-3
                sm:p-4
              "
              style={{ backgroundColor: category.bgColor }}
            >

              <img
                src={category.image}
                alt={category.text}
                className="
                  w-full
                  h-full
                  object-contain
                  group-hover:scale-105
                  transition-transform
                  duration-500
                "
              />

            </div>


            {/* Category Info */}
            <div className="bg-[#FFFDF8] text-center py-4 sm:py-5 px-2">

              <p className="
                text-xs
                sm:text-sm
                md:text-base
                tracking-[0.12em]
                font-semibold
                uppercase
                text-[#5A2850]
                truncate
              ">
                {category.text}
              </p>

              <p className="
                mt-2
                text-xs
                sm:text-sm
                text-[#292027]
                group-hover:text-[#B98BAA]
                transition-colors
              ">
                Shop Now <span className="ml-1">→</span>
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Categories