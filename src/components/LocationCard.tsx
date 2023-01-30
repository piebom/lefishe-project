import Image from 'next/image'
import React, { useState } from 'react'
import { Info } from 'react-feather'
import {motion} from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
  type Props = {
    title : string,
    images : string[],
    bio : string,
}
function LocationCard({title, images, bio}: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const variants = {
        open: { opacity: [0,0,0,0,0,0,1], display: 'block'},
        closed: { opacity: 0 ,display: 'none'},
      }
      const variants1 = {
        open: { opacity: 0},
        closed: { opacity: 1 },
      }
      const [opacities, setOpacities] = React.useState([])

      const [sliderRef,instanceRef] = useKeenSlider({
        slides: images.length,
        drag: false,
        loop: true,
        detailsChanged(s) {
          const t = s.track.details.slides.map((slide) => slide.portion)
          setOpacities(t)
        },
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        },
        created() {
          setLoaded(true)
        },
      })
  return (
    <div className='relative'>
      <div className="navigation-wrapper">
      <div ref={sliderRef} className="relative h-[500px]">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="w-[100%] h-[100%] absolute top-0"
          style={{ opacity: opacities[idx] }}
        >
          <Image alt='lake' src={"/" + src} width={1000} height={1000} className="rounded-2xl max-h-[535px] shadow-3xl -z-10"/>
        </div>
      ))}
    </div>
    {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
        <motion.div 
        initial={{
            width: '50px',
            height: '50px',
        }}
        whileHover={{
            width: '400px',
            height: '40%',
        }}
        transition={{
            duration:0.5,
        }}
        className='bg-[#3d3d3d] w-[50px] z-30 h-[50px] rounded-2xl absolute bottom-8 right-0 m-2 flex justify-center items-center shadow-3xl' onHoverStart={() => setIsOpen(true)} onHoverEnd={() => setIsOpen(false)}>
            <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants1}
            transition={{
                duration: 0.1,
            }}
            className="absolute flex justify-center items-center">
            <Info color='white'/>
            </motion.div>
            <motion.p
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{
                    duration:0.6
                }} className="text-white m-7 min-w-[360px] min-h-[140px]">
                {bio}
            </motion.p>
        </motion.div>
        <div className='bg-[#fbfbfb00] w-[100%] h-[30px] relative left-0 right-auto -bottom-2 rounded-md m-2 flex items-center justify-center'>
            <p className='text-white font-bold text-lg m-0 p-0'>{title}</p>
        </div>
    </div>
  )
}
function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = false ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
export default LocationCard