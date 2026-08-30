import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
    return (
        <div className='relative mt-24'>
            <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block'/>
            <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden'/>

            <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-1 md:pt-0 md:pr-64'>
                <div>
                  <h1 className='font-display text-3xl md:text-4xl text-primary mb-6 leading-[0.96] tracking-[-0.02em]'>Why We Are the Best?</h1>
                       {features.map((feature, index)=>(
                    <div key={index} className='flex items-center gap-4 mt-2'>
                        <img src={feature.icon} alt={feature.title} className='md:w-10 w-9' />
                        <div>
                          <h3 className='font-display text-xl md:text-2xl leading-[1] tracking-[-0.02em]'>{feature.title}</h3>
                             <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
                        </div>
                    </div>
                                         ))}
                </div>
            </div>

        </div>
    )
}

export default BottomBanner