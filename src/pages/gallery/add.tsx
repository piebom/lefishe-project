import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Image from 'next/image'
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../utils/api";
import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";

type Props = {}

function add({}: Props) {
  const [file, setFile] = useState<any>(null)
  const [urll, seturll] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setweight] = useState("");
  const router = useRouter();
  const OnFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0])
    seturll(URL.createObjectURL(e.currentTarget.files?.[0]))
  }

  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file:any) => {
    console.log("top")
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };
  const mutation = api.vangst.createVangst.useMutation({
    onError: (e) => console.log(e.message),
    onSuccess: () => router.push("/gallery"),
  });
  const postVangst = async (event:any) => {
    event.preventDefault();
    let { url } = await uploadToS3(file);
    await mutation.mutateAsync({name, date: "2015-12-20 10:01:00.999999", description, weight, imageURL:url, userId:"cldi5m2jh0001j1p8qp70cfv3"});
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='shadow-2xl bg-white w-[30%] h-fit rounded-2xl p-5'>
        <h1 className='font-bold text-2xl'>Add new post</h1>
        <form onSubmit={postVangst} className="flex flex-col justify-center items-center m-2">
            <div className="flex items-center bg-transparant justify-center w-fit min-w-[300px] h-fit min-h-[300px]">
              <label className="flex flex-col items-center relative justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparant dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {file && <Image alt="image" className="absolute w-[100%] h-[100%] p-2" src={urll} layout='fill' objectFit='contain'/> }
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input onChange={OnFileChange} id="dropzone-file" type="File" className="hidden" />
              </label>
            </div>
          <div className="flex flex-col justify-start self-start w-full">
            <label className='font-bold'>Name</label>
            <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2 border border-gray-300"
          type="text"
        />
          </div>
          <div className="flex w-full gap-10 mt-2">
          <div className="flex flex-col justify-start self-start w-[50%]">
            <label className='font-bold'>Datum vangst</label>
            <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2 border border-gray-300" onChange={(e) => setname(e.target.value)}
          type="date"
        />
          </div>
          <div className="flex flex-col justify-start self-start w-[50%]">
            <label className='font-bold'>Gewicht vangst</label>
            <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2 border border-gray-300"
          type="number" onChange={(e) => setweight(e.target.value)}
        />
        </div>
          </div>
          <div className="flex flex-col justify-start self-start mt-2 w-full">
            <label className='font-bold'>Beschrijving</label>
            <textarea
          className="bg-[#FAF9F6] p-2 resize-none rounded-lg mt-2 border h-[100px] border-gray-300" onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <input type="submit" className=' mt-5 w-full bg-[#6A8E7F] p-3 text-white font-bold rounded-lg' />
        </form>
      </div>
    </div>
  )
}

export default add