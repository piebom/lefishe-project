import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Image from 'next/image'
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../utils/api";
import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import CreatableSelect from 'react-select/creatable';
import { SingleValue } from "react-select";
import sessie from "../sessie";
import { date } from "zod";

type Props = {}

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions:any =[]

function add({}: Props) {
  const data = api.locatie.getOptions.useQuery()
  const [file, setFile] = useState<any>(null)
  const [urll, seturll] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [Sessie, setSessie] = useState("");
  const [weight, setweight] = useState("");
  const [aas, setaas] = useState("");
  const router = useRouter();
  const [dataloaded, setdataloaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(null);
  const [value, setValue] = useState<Option | null>();
  const mutation1 = api.locatie.createLocatie.useMutation({
      onError: (e) => console.log(e.message),
      onSuccess: () => console.log("success"),
  });
  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      await mutation1.mutateAsync({Locatie: inputValue});
      setIsLoading(false);
      setOptions((prev) => [...prev, createOption(inputValue)]);
      setValue(createOption(inputValue));
    }, 1000);
  };
  const onSelectChange = (a : SingleValue<Option>) => {
    setValue(a);
    setSessie(a?.value);
  }
  const OnFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0])
    seturll(URL.createObjectURL(e.currentTarget.files?.[0]))
  }
  if(dataloaded == false && data.data){
    setOptions(data.data)
    setdataloaded(true)
  }

  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();

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
    console.log(Sessie)
    await mutation.mutateAsync({locatieId: Sessie, date: startDate.toISOString().slice(0, 19).replace('T', ' '), description, weight, imageURL:url,aas, userId:"cldl7c44t0001j1d0cxm7zcli"});
  }
  if(!options){
    return <div className='w-full min-h-screen flex flex-col justify-center items-start mt-10 lg:mt-0 lg:items-center'>
<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    </div>
  }else{
  return (
    <div className='w-full min-h-screen flex justify-center items-start mt-10 lg:mt-0 lg:items-center'>
      <div className='shadow-2xl bg-white w-[90vw] lg:w-[30%] h-[83vh] lg:h-fit rounded-2xl p-5'>
        <h1 className='font-bold text-2xl'>Add new post</h1>
        {files.map((file, index) => (
          <div key={index}>
            File #{index} progress: {file.progress}%
          </div>
        ))}
        <form onSubmit={postVangst} className="flex flex-col justify-center items-center m-2">
            <div className="flex items-center bg-transparant justify-center w-fit min-w-[300px] h-fit p-5">
              <label className="flex flex-col items-center relative justify-center lg:w-full lg:h-64 w-52 h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparant ">
                {file && <Image alt="image" className="absolute w-[100%] h-[100%] p-2" src={urll} layout='fill' objectFit='contain'/> }
                {!file && <div className="flex flex-col items-center justify-center  p-5 pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>}
                <input onChange={OnFileChange} id="dropzone-file" type="File" className="hidden" />
              </label>
            </div>
            <div className="flex w-full gap-10 mt-2">
            <div className="flex flex-col justify-start self-start w-[50%]">
            <label className='font-bold'>Sessie</label>
    <CreatableSelect
      className="bg-[#FAF9F6] p-0 rounded-lg mt-2 border border-gray-300"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "transparant",
          border: "none"
        }),
      }}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => onSelectChange(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
    </div>
    <div className="flex flex-col justify-start self-start w-[50%]">
            <label className='font-bold'>Datum vangst</label>
            <DatePicker
          className="bg-[#FAF9F6] w-[100%] p-1.5 rounded-lg mt-2 border border-gray-300"     
          onChange={(date) => {
            const d = new Date(date);
            setStartDate(d);
          }}
          value={startDate.toLocaleDateString()}
          dateFormat="dd/MM/yyyy"
        />
        </div>
          </div>
          <div className="flex w-full gap-10 mt-2">
          <div className="flex flex-col justify-start self-start w-[50%]">
            <label className='font-bold'>Gebruikte aas</label>
            <input
          className="bg-[#FAF9F6] p-2 rounded-lg mt-2 border border-gray-300"
          type="text" onChange={(e) => setaas(e.target.value)}
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
}

export default add