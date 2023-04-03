import React from "react";
import { motion, useIsPresent } from "framer-motion";

function Competition() {
  const isPresent = useIsPresent();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-5">
      <div className="h-[40%] w-[50%] rounded-xl bg-white p-5 text-center shadow-2xl">
        <h1 className="text-4xl font-bold">Competition</h1>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 ">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border- bg-white">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="border-b bg-white">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Competition;
