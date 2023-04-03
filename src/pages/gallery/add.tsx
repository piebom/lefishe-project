import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../utils/api";
import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import { SingleValue } from "react-select";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const defaultOptions: any = [];

function Add() {
  const data = api.locatie.getOptions.useQuery();
  const [file, setFile] = useState<any>(null);
  const [urll, seturll] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [Sessie, setSessie] = useState("");
  const [weight, setweight] = useState("");
  const [aas, setaas] = useState("");
  const router = useRouter();
  const [dataloaded, setdataloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [value, setValue] = useState<Option | null>();
  const mutation1 = api.locatie.createLocatie.useMutation({
    onError: (e) => console.log(e.message),
    onSuccess: () => console.log("success"),
  });
  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      await mutation1.mutateAsync({ Locatie: inputValue });
      setIsLoading(false);
      setOptions([...options, createOption(inputValue)]);
      setValue(createOption(inputValue));
    }, 1000);
  };
  const onSelectChange = (a: SingleValue<Option>) => {
    setValue(a);
    setSessie(a?.value || "");
  };
  const OnFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0]);
    seturll(URL.createObjectURL(e.currentTarget.files?.[0] || new Blob()));
  };
  if (dataloaded == false && data.data) {
    setOptions(data.data);
    setdataloaded(true);
  }

  const [imageUrl, setImageUrl] = useState("");
  const { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();

  const handleFileChange = async (file: any) => {
    console.log("top");
    const { url } = await uploadToS3(file);
    setImageUrl(url || "");
  };
  const mutation = api.vangst.createVangst.useMutation({
    onError: (e) => console.log(e.message),
    onSuccess: () => router.push("/gallery"),
  });
  const postVangst = async (event: any) => {
    event.preventDefault();
    const { url } = await uploadToS3(file);
    console.log(Sessie);
    await mutation.mutateAsync({
      locatieId: Sessie,
      date: startDate.toISOString().slice(0, 19).replace("T", " "),
      description,
      weight,
      imageURL: url,
      aas,
      userId: "cldl7c44t0001j1d0cxm7zcli",
    });
  };
  if (!options) {
    return (
      <div className="mt-10 flex min-h-screen w-full flex-col items-start justify-center lg:mt-0 lg:items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-10 flex min-h-screen w-full items-start justify-center lg:mt-0 lg:items-center">
        <div className="h-[83vh] w-[90vw] rounded-2xl bg-white p-5 shadow-2xl lg:h-fit lg:w-[30%]">
          <h1 className="text-2xl font-bold">Add new post</h1>
          {files.map((file, index) => (
            <div key={index}>
              File #{index} progress: {file.progress}%
            </div>
          ))}
          <form
            onSubmit={postVangst}
            className="m-2 flex flex-col items-center justify-center"
          >
            <div className="bg-transparant flex h-fit w-fit min-w-[300px] items-center justify-center p-5">
              <label className="bg-transparant relative flex h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 lg:h-64 lg:w-full ">
                {file && (
                  <Image
                    alt="image"
                    className="absolute h-[100%] w-[100%] p-2"
                    src={urll}
                    layout="fill"
                    objectFit="contain"
                  />
                )}
                {!file && (
                  <div className="flex flex-col items-center justify-center  p-5 pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  onChange={OnFileChange}
                  id="dropzone-file"
                  type="File"
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-2 flex w-full gap-10">
              <div className="flex w-[50%] flex-col justify-start self-start">
                <label className="font-bold">Sessie</label>
                <CreatableSelect
                  className="mt-2 rounded-lg border border-gray-300 bg-[#FAF9F6] p-0"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "transparant",
                      border: "none",
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
              <div className="flex w-[50%] flex-col justify-start self-start">
                <label className="font-bold">Datum vangst</label>
                <DatePicker
                  className="mt-2 w-[100%] rounded-lg border border-gray-300 bg-[#FAF9F6] p-1.5"
                  onChange={(date: Date) => {
                    const d = new Date(date);
                    setStartDate(d);
                  }}
                  value={startDate.toLocaleDateString()}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="mt-2 flex w-full gap-10">
              <div className="flex w-[50%] flex-col justify-start self-start">
                <label className="font-bold">Gebruikte aas</label>
                <input
                  className="mt-2 rounded-lg border border-gray-300 bg-[#FAF9F6] p-2"
                  type="text"
                  onChange={(e) => setaas(e.target.value)}
                />
              </div>
              <div className="flex w-[50%] flex-col justify-start self-start">
                <label className="font-bold">Gewicht vangst</label>
                <input
                  className="mt-2 rounded-lg border border-gray-300 bg-[#FAF9F6] p-2"
                  type="number"
                  onChange={(e) => setweight(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-2 flex w-full flex-col justify-start self-start">
              <label className="font-bold">Beschrijving</label>
              <textarea
                className="mt-2 h-[100px] resize-none rounded-lg border border-gray-300 bg-[#FAF9F6] p-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <input
              type="submit"
              className=" mt-5 w-full rounded-lg bg-[#6A8E7F] p-3 font-bold text-white"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Add;
