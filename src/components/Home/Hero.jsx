"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoveUpRight } from "lucide-react"
import Image from "next/image"
import "./Hero.css"
import { useRouter } from "next/navigation"

export default function Home() {
  const [showLanding, setShowLanding] = useState(false)
  const navigate = useRouter()

  return (
    <div className="w-screen h-screen bg-[url('/bg.png')] bg-contain bg-center">
      <AnimatePresence mode="wait">
        {!showLanding ? (
          // Splash Screen
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col pb-5"
          >
            <div className="nav ml-5 mt-5 flex justify-center items-center p-5 mb-12 ">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="logomain"
              >
                <h1 className="logo text-white  ">
                  <span className='text-[#6366F1] font-["Rammetto One"]'>D</span>
                  ishaMarg
                </h1>
              </motion.div>
              {/* <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="button pr-4"
              >
                <button className="bg-white" onClick={()=>navigate.push('/login')} >
                  <span className="block -translate-x-1 -translate-y-1 border-2 text-white border-white bg-black active:bg-[#57FF31] py-2 px-10 text-xl transition-all active:translate-x-0 active:translate-y-0">
                    Login
                  </span>
                </button>
              </motion.div> */}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="cta w-[70vw] mx-auto flex flex-col items-center justify-center "
            >
              <h1 className="font-poppins font-semibold text-8xl text-center text-[#6366F1]"><span className='text-[#57FF31] font-saman'>Margdarshan </span> for Success with AI</h1>
              <div className="cta-img mr-10">
                <Image src="/robot.png" width={150} height={200} alt="AI Robot" className="object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6}}
              className="button flex items-center justify-center mt-9"
            >
              <button className="bg-white " onClick={() => setShowLanding(true)}>
                <span className="block -translate-x-1 -translate-y-1 border-2 text-white border-white bg-black active:bg-[#57FF31] py-2 px-10 text-xl transition-all active:translate-x-0 active:translate-y-0 ">
                  Get Started
                </span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          // Landing Page
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col justify-between pb-5"
          >
            <div className="nav ml-5 mt-5 flex justify-between items-center p-5">
              <div className="logomain">
                <h1 className="logo text-white">
                  <span className='text-[#6366F1] font-["Rammetto One"]'>D</span>
                  ishaMarg
                </h1>
              </div>
              <div className="name flex items-center justify-center pt-2">
                <h1 className="text-white font-poppins font-medium text-3xl text-center"><span className="text-[#57FF31] font-saman">Margdarshan</span> for Success with AI</h1>
              </div>
              <div className="button pr-4">
                <button className="bg-white"
                onClick={()=>navigate.push('/login')}>
                  <span className="block -translate-x-1 -translate-y-1 border-2 text-white border-white bg-black active:bg-[#57FF31] py-2 px-10 text-xl transition-all active:translate-x-0 active:translate-y-0">
                    Login
                  </span>
                </button>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cta w-[90vw] mx-auto flex items-center justify-center mr-10"
            >
              <p className="text-white text-6xl lg:text-8xl font-semibold text-center">
              DishaMarg <span className="text-[#57FF31]"> AI-Powered</span> Learning Path
              </p>
              <div className="cta-img mr-10">
                <Image src="/robot.png" width={200} height={300} alt="AI Robot" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="dash flex justify-between items-center gap-5 flex-wrap"
            >
              <div className="dash-div-1 font-poppins w-[350px] h-[188px] rounded-tr-[97px] rounded-br-[97px] bg-[#191919] flex items-center justify-between p-5">
                <p className="w-1/2 text-[40px] text-center font-bold leading-[49px] tracking-normal text-white">
                  Get Started
                </p>
                <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center bg-[#57FF31]">
                  <button>
                    <MoveUpRight size={60} color="black" />
                  </button>
                </div>
              </div>
              <div className="dash-div-2 font-poppins w-[600px] h-[188px] rounded-[97px] bg-[#191919] flex items-center justify-between p-20">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-[60px] font-semibold">3x</h1>
                  <h1 className="text-[#838383]">Learning Speed</h1>
                </div>
                <div>
                  <img src="/hero/line.png" alt="Divider" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-[60px] font-semibold">200+</h1>
                  <h1 className="text-[#838383]">AI-Generated Career Path</h1>
                </div>
              </div>
              <div className="dash-div-3 w-[350px] h-[188px] rounded-tl-[97px] rounded-bl-[97px] bg-[#191919] flex items-center justify-between p-5">
                <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center bg-[#6366F1]">
                  <button>
                    <MoveUpRight size={60} color="black" />
                  </button>
                </div>
                <p className="font-poppins w-1/2 text-[40px] text-center font-bold leading-[49px] tracking-normal text-white">
                  Watch Demo
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

