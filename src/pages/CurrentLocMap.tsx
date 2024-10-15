import React, { useState } from "react";
import crosss from "../images/crossicon.svg";
import mapp from "../images/map.svg";

interface CurrentLocMapProps {
  cross: (e: React.MouseEvent<HTMLImageElement>) => void;
}

function CurrentLocMap({ cross }: CurrentLocMapProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        },
        (error) => {
          console.error("Error getting location", error);
        },
        {
          enableHighAccuracy: true, // Request high-accuracy location
          timeout: 10000, // Optional: Specify a timeout if location retrieval takes too long
          maximumAge: 0, // Optional: Force to get the most current location
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-white w-full p-5 m-5 rounded-lg font-poppins ">
      <div className="flex gap-1 items-center justify-between">
        <p
          onClick={handleGetLocation}
          className="font-medium text-blue underline leading-[1.3rem] "
        >
          Open Maps
        </p>
        <img
          src={crosss}
          alt="Close"
          className="w-5 h-5 rounded-full p-[0.1rem]"
          onClick={cross}
        />
      </div>
    </div>
  );
}

export default CurrentLocMap;
