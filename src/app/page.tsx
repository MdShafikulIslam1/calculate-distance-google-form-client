"use client";
import { useState } from "react";
import { FaCar, FaUsers } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export default function DistanceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [passenger, setPassenger] = useState<number>(0);

  return (
    <div className="min-h-screen w-1/2 p-6 mx-auto bg-gray-900 flex flex-col  text-white">
      <h1 className="text-3xl font-bold">Distance Price Calculator</h1>
      <div className="border">
        <div className="grid grid-cols-4 gap-4">
          {/* starting address */}
          <div className="mb-4 col-span-3">
            <label
              htmlFor="from"
              className="block font-medium mb-1 text-center"
            >
              Starting address
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <MdLocationPin size={24} />
              </div>
              <input
                id="from"
                type="text"
                placeholder="Starting location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          {/* vehicle */}
          <div className="mb-4 col-span-1">
            <label
              htmlFor="vehicle"
              className="block font-medium mb-1 text-center"
            >
              Vehicle
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <FaCar size={24} />
              </div>
              <select
                id="vehicle"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              >
                <option value="" disabled>
                  Select a vehicle
                </option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="bus">Bus</option>
                <option value="truck">Truck</option>
              </select>
            </div>
          </div>
          {/* Arrival address */}
          <div className="mb-4 col-span-3">
            <label
              htmlFor="from"
              className="block font-medium mb-1 text-center"
            >
              Arrival address
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <MdLocationPin size={24} />
              </div>
              <input
                id="from"
                type="text"
                placeholder="Starting location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          {/* Passengers */}
          <div className="mb-4 col-span-1">
            <label
              htmlFor="passengers"
              className="block font-medium mb-1 text-center"
            >
              Passengers
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <FaUsers size={24} />
              </div>
              <div className="flex items-center w-full">
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={() => setPassenger((prev) => Math.max(prev - 1, 0))}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-l border border-gray-600"
                >
                  -
                </button>

                {/* Display Number */}
                <input
                  type="text"
                  value={passenger}
                  readOnly
                  className="w-full text-center p-2 bg-gray-700 border-t border-b border-gray-600 focus:outline-none"
                />

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={() => setPassenger((prev) => prev + 1)}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-r border border-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
