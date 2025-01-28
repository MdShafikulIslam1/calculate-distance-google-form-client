/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/Loader";
import getBaseUrl from "@/utils/getBaseUrl";
import { useGoogleMapsLoader } from "@/utils/googleApiLoader";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  StandaloneSearchBox
} from "@react-google-maps/api";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.685,
  lng: 90.3563,
};

export default function DistanceCalculator() {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const [loading, setLoading] = useState(false);
  const startAddressRef = useRef<null | any>(null);
  const arrivalAddressRef = useRef<null | any>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  // const arrivalAddressRef =
  //   useRef<null | google.maps.places.StandaloneSearchBox>(null);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [response, setResponse] = useState<{
    startAddress: string;
    endAddress: string;
    distance: string;
    price: string;
  } | null>(null);

  // load google maps api
  const isLoaded = useGoogleMapsLoader();

  const calculateRouteWithDirectionsService = () => {
    if (markers.length < 2) {
      alert("Please select both starting and arrival points on the map.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const origin = markers[0];
    const destination = markers[1];

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result); // Store the result in state to render it on the map
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    if (from && to && markers.length >= 2) {
      calculateRouteWithDirectionsService();
    }
  }, [from, to, markers]);

  const renderDirectionRoute = () => {
    if (directions) {
      return (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#FF5733",
              strokeOpacity: 0.8,
              strokeWeight: 5,
            },
            suppressMarkers: false, // Use custom markers if needed
          }}
        />
      );
    }
    return null;
  };

  const geocodeLatLng = useCallback(
    (latLng: google.maps.LatLngLiteral, isStart: boolean) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          if (isStart) {
            setFrom(address);
          } else {
            setTo(address);
          }
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    },
    []
  );

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (markers.length >= 2) {
        alert("You can only select two locations.");
        return;
      }
      if (event.latLng) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkers((prev) => [...prev, newMarker]);

        // Convert lat/lng to address and update state
        if (markers.length === 0) {
          geocodeLatLng(newMarker, true); // Set as "from" address
        } else if (markers.length === 1) {
          geocodeLatLng(newMarker, false); // Set as "to" address
        }
      }
    },
    [geocodeLatLng, markers.length]
  );

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker}
        label={index === 0 ? "Starting" : index === 1 ? "Arrival" : ""}
      />
    ));
  };


  

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleOnStartAddressChanged = () => {
    const places = startAddressRef.current?.getPlaces();
    console.log("current starting place: ", places);
    if (places && places.length > 0) {
      const address = places[0].formatted_address;
      setFrom(address);
      const location = places[0].geometry.location;
      const newMarker = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setMarkers((prev) => {
        const newMarkers = [...prev];
        newMarkers[0] = newMarker; // Update the first marker (start location)
        return newMarkers;
      });
    }
  };

  const handleOnArrivalAddressChanged = () => {
    const places = arrivalAddressRef.current?.getPlaces();
    if (places && places.length > 0) {
      const address = places[0].formatted_address;
      setTo(address);
      const location = places[0].geometry.location;
      const newMarker = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setMarkers((prev) => {
        const newMarkers = [...prev];
        newMarkers[1] = newMarker; // Update the second marker (arrival location)
        return newMarkers;
      });
    }
  };

  const calculateDistance = async () => {
    if (!from || !to || markers.length === 0) {
      return alert("Please select both starting and arrival addresses.");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${getBaseUrl() as string}/calculate/distance`,
        {
          startAddress: from,
          endAddress: to,
        }
      );
      console.log("Response:", response?.data?.data);
      if (!!response?.data?.success) {
        setResponse(response.data.data);
        setFrom("");
        setTo("");
        setMarkers([]);
        setLoading(false);
        toggleModal();
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
      alert("Error calculating distance. Please try again later.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="border rounded-md border-gray-600 w-full md:w-1/2 p-6 mx-auto bg-gray-900 flex flex-col text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Distance Price Calculator
        </h1>
        <div className="grid grid-cols-4 gap-4 mb-6 ">
          {/* Starting Address */}
          <div className="col-span-4">
            <label className="block font-medium mb-1 text-center">
              Starting Address
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <MdLocationPin size={24} />
              </div>
              <div className="w-full">
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={(ref) => (startAddressRef.current = ref)}
                    onPlacesChanged={handleOnStartAddressChanged}
                  >
                    <input
                      type="text"
                      placeholder="Click on map to set starting point"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      // readOnly

                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                  </StandaloneSearchBox>
                )}
              </div>
            </div>
          </div>
          {/* Arrival Address */}
          {/* <div className="col-span-1">
            <label className="block font-medium mb-1 text-center">
              Arrival Address
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <MdLocationPin size={24} />
              </div>
              <div className="w-full">
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={(ref) => (arrivalAddressRef.current = ref)}
                    onPlacesChanged={handleOnArrivalAddressChanged}
                  >
                    <input
                      type="text"
                      placeholder="Click on map to set arrival point"
                      // value={from}
                      // readOnly
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                  </StandaloneSearchBox>
                )}
              </div>
            </div>
          </div> */}
          {/* Arrival Address */}
          <div className="col-span-4">
            <label className="block font-medium mb-1 text-center">
              Arrival Address
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <MdLocationPin size={24} />
              </div>
              <div className="w-full">
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={(ref) => (arrivalAddressRef.current = ref)}
                    onPlacesChanged={handleOnArrivalAddressChanged}
                  >
                    <input
                      type="text"
                      placeholder="Click on map to set arrival point"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      // readOnly
                      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                    />
                  </StandaloneSearchBox>
                )}
              </div>
            </div>
          </div>
          {/* Passengers */}
          {/* <div className="col-span-1">
            <label className="block font-medium mb-1 text-center">
              Passengers
            </label>
            <div className="flex items-center">
              <div className="p-2 rounded bg-gray-700 border border-gray-600">
                <FaUsers size={24} />
              </div>
              <div className="flex items-center w-full">
                <button
                  type="button"
                  onClick={() => setPassenger((prev) => Math.max(prev - 1, 0))}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-l border border-gray-600"
                >
                  -
                </button>
                <input
                  type="text"
                  value={passenger}
                  readOnly
                  className="w-full text-center p-2 bg-gray-700 border-t border-b border-gray-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPassenger((prev) => prev + 1)}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-r border border-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-center items-center mb-3">
          <button
            type="button"
            onClick={calculateDistance}
            className="block w-fit p-2 bg-[#6E8E59] text-white font-bold rounded-md"
          >
            Estimate Calculate Price
          </button>
        </div>
    

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
            <div className="bg-gray-700 text-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-2 pb-4 border-b-[0.3px] border-[#FFFFFF4D]">
                <h2 className="text-lg font-bold">
                  Calculate Distance with price
                </h2>
                <button
                  className="text-xl font-bold hover:text-gray-300"
                  onClick={toggleModal} // Close modal on click
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-b-[0.3px] border-[#FFFFFF4D] pb-2 space-y-1">
                  <p className="font-semibold">Starting Address :</p>
                  <p className="text-gray-400">{response?.startAddress}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">Arrival Address:</p>
                  <p className="text-gray-400">{response?.endAddress}</p>
                </div>
                <div className="border-b-[0.3px] border-[#FFFFFF4D] pb-2 space-y-1">
                  <p className="font-semibold">Distance :</p>
                  <p className="text-gray-400">{response?.distance}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">Price:</p>
                  <p className="text-orange-400 font-bold">{response?.price}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Google Map */}
        <div className="col-span-4 h-96">
          <span className="text-gray-100 text-sm mb-1 block">
            Please select two addresses from the map.
          </span>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onClick={handleMapClick}
          >
            {renderMarkers()}
            {renderDirectionRoute()}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}
