import Image from "next/image";
import React, { useState } from "react";
import { Info } from "react-feather";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
type Props = {
  title: string;
  images: string[];
  bio: string;
};
function LocationCard({ title, images, bio }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const variants = {
    open: { opacity: [0, 0, 0, 0, 0, 0, 1], display: "block" },
    closed: { opacity: 0, display: "none" },
  };
  const variants1 = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };
  const [opacities, setOpacities] = useState<number[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: images.length,
    drag: false,
    loop: true,
    detailsChanged(s) {
      const t: number[] = s.track.details.slides.map((slide) => slide.portion);
      setOpacities(t);
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div className="relative ml-auto mr-auto h-fit w-[650px]">
      <div className="navigation-wrapper min-h-[90%]">
        <div ref={sliderRef} className="relative min-h-[250px] w-[100%]">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="absolute top-0 min-h-[250px] w-[100%]"
              style={{ opacity: opacities[idx] }}
            >
              <Image
                alt="lake"
                src={"/" + src}
                width={1000}
                height={1000}
                className="-z-10 max-h-[250px] min-h-[250px] rounded-2xl shadow-3xl lg:max-h-[450px]"
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
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
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
      <motion.div
        initial={{
          width: "50px",
          height: "50px",
        }}
        whileHover={{
          width: "400px",
          height: "40%",
        }}
        transition={{
          duration: 0.5,
        }}
        className="invisible absolute bottom-14 right-0 z-30 m-2 flex h-[50px] w-[50px] items-center justify-center rounded-2xl bg-[#3d3d3d] shadow-3xl lg:visible"
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={variants1}
          transition={{
            duration: 0.1,
          }}
          className="absolute flex items-center justify-center"
        >
          <Info color="white" />
        </motion.div>
        <motion.p
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={{
            duration: 0.6,
          }}
          className="m-7 min-h-[140px] min-w-[360px] text-white"
        >
          {bio}
        </motion.p>
      </motion.div>
      <div className="relative left-0 right-auto bottom-20 ml-5 flex h-fit w-[100%] flex-col items-start justify-center rounded-md bg-[#fbfbfb00]">
        <p className="m-0 p-0 text-lg font-bold text-white">{title}</p>
        <p className="visible m-0 p-0 text-lg text-white lg:invisible">{bio}</p>
      </div>
    </div>
  );
}
function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = false ? " arrow--disabled" : "";
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
  );
}
export default LocationCard;
