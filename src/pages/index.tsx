import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion, useIsPresent } from 'framer-motion';
import { api } from "../utils/api";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { once } from "events";
import UserCard from "../components/UserCard";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import LocationCard from "../components/LocationCard";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const session = useSession()
  const imagesSlide1 = ["lake1.jpg","lake2.jpg"]
  const imagesSlide2 = ["niel1.jpg","niel2.jpg","niel3.jpg"]
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 10,
    },
  })
  const isPresent = useIsPresent();
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center snap-y snap-mandatory'>
            {/* <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "anticipate" } }}
        exit={{ scaleX: 0, transition: { duration: 1, ease: "backIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      /> */}
      <section className='min-h-screen w-screen relative flex flex-col justify-center items-center bg-bottom bg-no-repeat bg-indexbg bg-[length:100%_30vh] lg: bg-[length:100%_100vh] snap-center'>
      <h1 className="text-[40px] lg:text-[50px] font-bold tracking-widest">LE FISHE</h1>
      <p className="font-sans lg:text-[20px] text-[14px]">A group of friends who likes to catch and share fishes</p>
        <ul className="flex mt-5 space-x-10">
          <li>
            <a className="underline uppercase tracking-widest font-bold" href="#about">About</a>
          </li>
          <li>
            <a className="underline uppercase tracking-widest font-bold" href="#locations">Locations</a>
          </li>
          <li>
            <a className="underline uppercase tracking-widest font-bold" href="#fishes">Fishes</a>
          </li>
        </ul>
        {/* <motion.div  className="absolute right-20 bottom-[-200px]"
        initial={{
            x: 200,
            scale:0.4
        }}
        whileInView={{
            x:0,
            scale:1
        }}
        transition={{
            duration:2.5
        }}
        viewport={{ once: true }}
        >
          <Image alt="trout" src="/fish1.png" width={250} height={250}></Image>
        </motion.div> */}
      </section>
      <section id="about" className="min-h-screen w-screen flex justify-center items-center bg-gradient-to-b snap-start from-[#003e78] to-[#003260] space-x-10">
        <div className="flex overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory relative overflow-y-hidden min-w-screen space-x-10 h-fit mb-[150px]">
        <UserCard imageURL="/jonas.jpg" naam="Jonas Van De Velde" bijnaam="Njörd Günderson" bio="Ik ben Jonas, a.k.a Njörd Günderson. Mijn visserij is heel allround en zo ben ik ben van alle markten een beetje thuis. Mijn passie ligt bij het vissen in Frankrijk op de grote meren, rivieren en kanaaltjes. 
                    Eén doel: 20kg+"/>
        <UserCard imageURL="/brendon.jpg" naam="Brendon Poppe" bijnaam="Andrew Tate / Pop-up master" bio="Ik ben Brendon, ook gekend als andrew teedt of pop-up master. Hoewel ik nog zeer nieuw ben in het vissen heb ik al op verschillende wateren mijn vis gevangen. Dit jaar wordt voor mij veel experimenteren zo doe ik dit bv al met mijn pop-ups aan te passen. Mijn doel: dubbel run 25+"/>
        <UserCard imageURL="/dries.jpg" naam="Dries Van Havermaet" bijnaam="Jonathan DuPrince" bio="Ik ben Dries a.k.a. Jonathan DuPrince. Als volledige nieuweling ben ik al blij met elke vis die ik kan binnenhalen, al heb ik liever geen dwergmeerval aan de haak. Mijn focus zal dan ook vooral op de lokale waters gezicht zijn. Mijn doel: 15+."/>

        </div>        
      </section>
      {/* <motion.div  className="absolute left-40"
        initial={{
            x: -100,
            scale:0.4
        }}
        whileInView={{
            x:0,
            scale:1
        }}
        transition={{
            duration:2.5
        }}
        viewport={{ once: true }}
        >
        <Image alt="carp" src="/carp.png" width={500} height={500} className="scale-x-[-100%]"></Image>
        </motion.div> */}
      <section id="locations" className="min-h-screen w-screen flex flex-col justify-center items-center snap-center bg-gradient-to-b from-[#003260] to-[#002548]">
        <div className="relative -top-6">
          <p className="text-white font-bold text-3xl">Locaties</p>
        </div>
        <div ref={sliderRef} className="keen-slider h-[50vh]">
          <div className="keen-slider__slide number-slide1 relative">
            <LocationCard title="Oude durme - Hamme" bio="Oude durme: Dit is een mooi water in de regio hamme. Dit water is voornamelijk opstakel visserei. De krabben zijn er in de warme maanden zeer aanwezig maar de vis die er zit is zeker de moeite waard! Aanrader --> gele pop-ups en snowman" images={imagesSlide1}/>
          </div>
          <div className="keen-slider__slide number-slide2 relative">
            <LocationCard title="Nielse kleiputten - Niel" bio="Niel: de nielse kleiputten is een zeer mooi groot water in de regio Antwerpen. Het water bestaat uit meerdere verbonden vijvers. Deze vijvers kunnen tot 6m diep gaan en in de zomer maanden staat het vol beplanting, tegen de winter is dit geen probleem meer.
Optie - - > succes gehad met bewerkte pop-up" images={imagesSlide2}/>
          </div>
        </div>
      </section>
      <section id="fishes" className="min-h-screen w-screen flex justify-center items-center snap-center bg-gradient-to-b from-[#002548] to-[#001930]">
      <h1 className="font-bold text-white text-2xl">fishes</h1>
      </section>
      <motion.div  className="absolute right-40 bottom-[-2800px]"
        initial={{
            x: 200,
            scale:0.4
        }}
        whileInView={{
            x:0,
            scale:1
        }}
        transition={{
            duration:2.5
        }}
        viewport={{ once: true }}
        >
          <Image alt="kraken" src="/kraken.png" width={500} height={500}></Image>
        </motion.div>
    </div>
  );
};

export default Home;

