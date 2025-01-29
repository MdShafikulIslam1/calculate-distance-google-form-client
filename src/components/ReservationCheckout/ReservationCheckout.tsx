import ReservationForm from "../ReservationForm/ReservationForm";

const ReservationCheckout = () => {
  
  return (
    <div className="bg-gray-300 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-1/2 pt-12 mx-auto">
        <div>
          <ReservationForm />
        </div>
        <div>thank you</div>
      </div>
    </div>
  );
};

export default ReservationCheckout;
