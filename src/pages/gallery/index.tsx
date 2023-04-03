import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion, useIsPresent } from "framer-motion";
import PostCard from "../../components/PostCard";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import { Grid, Square } from "react-feather";
import { TypeOf } from "zod";
type Props = {};

function Gallery({}: Props) {
  const router = useRouter();
  const [value, changeValue] = useState(2);
  const { data: session, status } = useSession();
  const [favorite, setfavorite] = useState(false);
  const [vangsten, setVangsten] = useState<any[]>([]);
  const [sessie, setsessie] = useState<string>("All");
  const [gridclass, changeGridClass] = useState("grid-cols-2");
  const change = (v: React.SetStateAction<number>) => {
    console.log(v);
    changeValue(v);
    if (v == 1) {
      changeGridClass("grid-cols-1");
    } else if (v == 2) {
      changeGridClass("grid-cols-2");
    } else if (v == 3) {
      changeGridClass("grid-cols-3");
    }
    console.log(gridclass);
  };
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  };
  const locatie = api.locatie.getAllLocations.useQuery();
  const data = api.vangst.getAllVangstByLocationId.useQuery({
    locatieId: sessie,
  }).data;
  const favorites = api.favorite.getAllFavoriteVangstenByUserId.useQuery(
    { userId: session?.user?.id || "" },
    { enabled: !!session?.user?.id }
  ).data;
  useEffect(() => {
    if (favorite) {
      const v: any[] = [];
      favorites?.forEach((element) => {
        v.push(element.vangst);
      });
      setVangsten(v);
    } else {
      if (data) {
        setVangsten(data);
      }
    }
  }, [data, favorite]);
  const onLocatieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setsessie(e.target.value);
  };
  const onFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfavorite(!favorite);
  };

  return (
    <div className="relative flex min-h-screen w-full snap-none flex-col items-center justify-start overflow-hidden">
      <h1 className="fixed z-20 h-[130px] w-screen bg-[#FAF9F6] pt-5 text-center text-[32pt] font-bold text-black">
        GALLERY
      </h1>
      <div className="items-top fixed z-20 mx-auto mt-[100px] flex w-full flex-col justify-between gap-5 bg-[#FAF9F6] pl-10 pr-10 pb-5 lg:flex-row lg:pl-40 lg:pr-40">
        <div className="flex items-center">
          <p className="mr-3 text-xl font-bold">Sessie: </p>
          <select
            onChange={(e) => onLocatieChange(e)}
            className="h-10 w-full rounded-md border p-2 lg:min-w-[250px]"
          >
            <option>All</option>
            {locatie.data?.map(({ id, Locatie }, index) => (
              <option key={id} value={id}>
                {Locatie}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[200px] items-center">
          <input
            onChange={(e) => onFavoriteChange(e)}
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Favorites only
          </label>
        </div>
        <div className="mt-2 mb-2 flex lg:invisible">
          <Square></Square>
          <input
            className="ml-2 mr-2 w-full accent-[#3d3d3d]"
            step={1}
            type="range"
            name=""
            value={value}
            min="1"
            max="3"
            onChange={(e) => change(parseInt(e.target.value))}
          />
          <Grid></Grid>
        </div>

        <div className="mt-2 flex w-full justify-between lg:justify-end lg:gap-5">
          <button
            onClick={() => router.push("/gallery/add")}
            className="h-10 w-fit rounded-lg bg-[#6A8E7F] pl-5 pr-5 font-bold text-white"
          >
            Nieuwe vangst
          </button>
        </div>
      </div>
      <div className="container m-10 mx-auto mt-[170px] flex h-full w-full justify-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={`grid h-full max-h-[100vh] w-full gap-6 overflow-y-scroll p-2 md:grid-cols-2 lg:grid-cols-5 ${gridclass}`}
        >
          {vangsten.length > 0 ? (
            vangsten?.map(
              (
                { id, name, date, description, weight, imageURL, userId },
                index
              ) => (
                <motion.div
                  key={index}
                  variants={item}
                  className=" relative aspect-square border-collapse overflow-hidden rounded-[15px] bg-transparent shadow-lg shadow-gray-600"
                >
                  <PostCard id={id} imageUrl={imageURL} />
                </motion.div>
              )
            )
          ) : (
            <div
              key={"1"}
              className="col-span-5 flex h-full w-[100%] items-center justify-center"
            >
              <p className="text-2xl font-bold">Geen vansten gevonden</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Gallery;
