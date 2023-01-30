import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Image from 'next/image'
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

type Props = {}

function sessie({}: Props) {
    const [Locatie, setLocatie] = useState("");
    const router = useRouter();
    const mutation = api.locatie.createLocatie.useMutation({
        onError: (e) => console.log(e.message),
        onSuccess: () => router.push("/gallery"),
    });
    const addLocatie = async (event:any) => {
        event.preventDefault();
        await mutation.mutateAsync({Locatie});
    }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='shadow-2xl bg-white w-[30%] h-fit rounded-2xl p-5'>
        <h1 className='font-bold text-2xl'>Voeg een nieuwe locatie toe</h1>
        <form onSubmit={addLocatie} className="flex flex-col justify-center items-center m-2">
          <div className="flex flex-col justify-start self-start w-full">
            <label className='font-bold'>Locatie</label>
            <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2 border border-gray-300" onChange={(e) => setLocatie(e.target.value)}
          type="text"
        />
          </div>
        <input type="submit" className=' mt-5 w-full bg-[#6A8E7F] p-3 text-white font-bold rounded-lg' />
        </form>
      </div>
    </div>
  )
}

export default sessie