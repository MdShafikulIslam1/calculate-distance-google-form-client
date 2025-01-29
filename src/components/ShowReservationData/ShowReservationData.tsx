/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllReservationQuery } from "@/redux/api/reservation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import Loader from "../Loader";

const ShowReservationData = () => {
  const { data, isLoading } = useGetAllReservationQuery({});
  const reservations = data?.data || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Link
        href="/"
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold transition-all"
      >
        <BsArrowLeft className="w-5 h-5" />
        Back to home
      </Link>
      <div className="bg-primary rounded-md mt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/5 uppercase text-xs font-medium h-12">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Route</th>
              <th className="px-4 py-2">Trip Type</th>
              <th className="px-4 py-2">Departure Date</th>
              <th className="px-4 py-2">Passengers</th>
              <th className="px-4 py-2">Distance</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res: any) => (
              <tr key={res.id} className="border-b border-gray-700">
                <td className="p-4 text-center">
                  {res.firstName} {res.lastName}
                </td>
                <td className="px-4 py-2 text-center">{res.companyName}</td>
                <td className="px-4 py-2 text-center">{res.email}</td>
                <td className="px-4 py-2 text-center">{res.phone}</td>
                <td className="px-4 py-2 text-center">
                  {res.route.departureAddress} → {res.route.arrivalAddress}
                </td>
                <td className="px-4 py-2 text-center">{res.route.tripType}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(res.route.departureDate).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">{res.route.passenger}</td>
                <td className="px-4 py-2 text-center">
                  {res.route.formatDistance}
                </td>
                <td className="px-4 py-2 text-center font-semibold">
                  ${res.route.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowReservationData;
