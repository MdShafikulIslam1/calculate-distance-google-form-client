/* eslint-disable @typescript-eslint/no-explicit-any */
import { formattedCountries } from "@/constants";
import { setReservation } from "@/redux/feature/reservation/reservationSlice";
import { useAppDispatch } from "@/redux/hook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Input from "../Input/Input";
import SelectField from "../SelectField/SelectField";

const ReservationForm = () => {
  const dispatch = useAppDispatch();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isShowPaymentMethod, setIsShowPaymentMethod] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReservationSubmit = async (data: any) => {
    dispatch(setReservation(data));
    setIsShowPaymentMethod(true);
  };

  if (isShowPaymentMethod) {
    return <CheckoutForm />;
  } else {
    return (
      <div className="w-full h-full bg-slate-100 p-6 text-black rounded-md">
        <h1 className="text-3xl mb-4 font-semibold text-center">Reservation</h1>
        <form
          onSubmit={handleSubmit(handleReservationSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              id="firstName"
              label="First Name"
              placeholder="Enter First Name"
              register={register}
              errors={errors}
            />
            <Input
              name="lastName"
              id="lasName"
              label="Last Name"
              placeholder="Enter Last Name"
              register={register}
              errors={errors}
            />
          </div>
          <Input
            name="companyName"
            id="companyName"
            label="Company Name"
            placeholder="Enter Company Name"
            register={register}
            errors={errors}
          />
          <Input
            name="email"
            id="email"
            label="E-mail Address"
            placeholder="Enter email address"
            register={register}
            errors={errors}
            type="email"
          />
          <Input
            name="phone"
            id="phone"
            label="Phone"
            placeholder="Enter contact number"
            register={register}
            errors={errors}
            type="text"
          />
          <SelectField
            name="country"
            label="Country"
            register={register}
            errors={errors}
            options={formattedCountries}
          />
          <Input
            name="streetAddress"
            id="streetAddress"
            label="Street number and name"
            placeholder="Enter Street number and name"
            register={register}
            errors={errors}
            type="text"
          />
          <Input
            name="apartmentOffice"
            id="apartmentOffice"
            label="Apartment, Office, etc..."
            placeholder="Enter Apartment, Office, etc..."
            register={register}
            errors={errors}
            type="text"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="city"
              id="city"
              label="City"
              placeholder="Enter city name"
              register={register}
              errors={errors}
              type="text"
            />
            <Input
              name="postalCode"
              id="postalCode"
              label="Postal code"
              placeholder="Enter postal code"
              register={register}
              errors={errors}
              type="text"
            />
          </div>

          <Input
            name="orderNotes"
            id="orderNotes"
            label="Order Notes"
            placeholder="Enter your order notes"
            register={register}
            errors={errors}
            type="textArea"
            required={false}
          />
          <Input
            name="flightOrTrain"
            id="flightOrTrain"
            label="Flight or train number"
            placeholder="Enter Flight or train number"
            register={register}
            errors={errors}
            type="text"
          />

          <div className="space-x-2">
            <input
              type="checkbox"
              id="termsAndCondition"
              {...register("termsAndCondition", {
                required: "You must agree to the terms and conditions",
              })}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            <label htmlFor="termsAndCondition">
              By submitting this form,{" "}
              <span className="text-[#FCB040]">I agree</span> that my
              information will be used only for the purpose of my reservation.
            </label>
            {/* {errors.termsAndCondition && (
              <p className="text-red-500 text-xs">
                {errors.termsAndCondition.message}
              </p>
            )} */}
          </div>

          <div className="flex justify-center">
            <button
              disabled={!agreedToTerms}
              type="submit"
              className={`px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none ${
                !agreedToTerms ? "cursor-not-allowed" : ""
              }`}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default ReservationForm;
