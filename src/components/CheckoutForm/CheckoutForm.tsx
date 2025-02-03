/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateReservationMutation } from "@/redux/api/reservation";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../Loader";

const CheckoutForm = () => {
  const { reservation, route } = useAppSelector((state) => state);
  const { register, handleSubmit } = useForm();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createReservation] = useCreateReservationMutation();

  const handlePayment = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await createReservation({
        ...data,
        ...reservation,
        ...route,
      }).unwrap();
      if (!!response.success) {
        setIsLoading(false);
        window.location.href = response?.data?.stripeUrl;
      }
    } catch (error) {
      console.log("Failed to create reservation", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 mx-auto p-6 shadow-lg rounded-2xl bg-gray-900 text-white">
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">
            Select Payment Method
          </h2>
          <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200">
              <input
                type="radio"
                id="CASH_ON_DELIVERY"
                {...register("paymentType")}
                value="CASH_ON_DELIVERY"
                onChange={() => setSelectedPayment("CASH_ON_DELIVERY")}
                // className="hidden"
              />
              <label
                htmlFor="CASH_ON_DELIVERY"
                className={`flex items-center space-x-2 cursor-pointer w-full p-2 rounded-lg ${
                  selectedPayment === "CASH_ON_DELIVERY"
                    ? "border-2 border-yellow-500"
                    : "border border-gray-600"
                }`}
              >
                <span className="text-[#FCB040]">Cash on Delivery</span>
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200">
              <input
                type="radio"
                id="ONLINE"
                {...register("paymentType")}
                value="ONLINE"
                onChange={() => setSelectedPayment("ONLINE")}
                // className="hidden"
              />
              <label
                htmlFor="ONLINE"
                className={`flex items-center space-x-2 cursor-pointer w-full p-2 rounded-lg ${
                  selectedPayment === "ONLINE"
                    ? "border-2 border-yellow-500"
                    : "border border-gray-600"
                }`}
              >
                <span className="text-[#FCB040]">Online Payment</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
