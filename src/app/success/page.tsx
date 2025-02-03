"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      Swal.close(); // Ensure SweetAlert is closed before redirection
      router.push("/");
    }, 5000); // Redirect after 2 seconds

    Swal.fire({
      title: "🎉 Success!",
      text: "You have successfully booked your reservation.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Go Back",
      confirmButtonColor: "#3085d6",
      allowOutsideClick: true, // Clicking outside will trigger redirection
    }).then((result) => {
      clearTimeout(timer); // Prevent auto-redirect if user interacts

      if (result.isConfirmed) {
        router.back(); // Go back when button is clicked
      } else {
        router.push("/"); // Redirect when clicking outside
      }
    });

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl">You have successfully booked your reservation</h1>
    </div>
  );
};

export default SuccessPage;
