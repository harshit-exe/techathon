import React from 'react'
import "./Hero.css"
import Image from 'next/image'
const Splash = () => {
  return (
    <div className="w-screen h-screen bg-[url('/bg.png')] bg-contain bg-center flex flex-col  pb-5">
        {/*  Navabar */}
      <div className="nav ml-5 mt-5 flex justify-between items-center p-5 mb-20">
        <div className="logomain">
          <h1 className="logo text-white">
            <span className='text-[#6366F1] font-["Rammetto One"]'>S</span>
            hikshaVerse
          </h1>
        </div>
        <div className="button pr-4">
          <button className=" bg-white">
            <span className=" block -translate-x-1 -translate-y-1  border-2 text-white border-white  bg-black active:bg-[#57FF31] py-2 px-10 text-xl transition-all  active:translate-x-0 active:translate-y-0">
              {" "}
              Login{" "}
            </span>
          </button>
        </div>
      </div>
       {/*  CTA */}
       <div className="cta w-[90vw] mx-auto flex flex-col items-center justify-center mr-10">
       <h1 className="font-colombo font-medium text-9xl text-center text-[#6366F1]">
            Learn Smarter with AI
          </h1>
        <div className="cta-img mr-10 ">
          <Image src="/robot.png" width={200} height={300} alt='0' className='object-cover' />
        </div>
      </div>
       {/*  Get Started Button */}
       <div className="button flex items-center justify-center mt-5">
          <button className=" bg-white">
            <span className=" block -translate-x-1 -translate-y-1  border-2 text-white border-white  bg-black active:bg-[#57FF31] py-2 px-10 text-xl transition-all  active:translate-x-0 active:translate-y-0">
              {" "}
              Get Started{" "}
            </span>
          </button>
        </div>
    </div>
  )
}

export default Splash