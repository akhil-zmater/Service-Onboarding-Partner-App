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
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation({ lat: latitude, lng: longitude });
          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-white w-full p-5 m-5 rounded-lg font-poppins ">
      {/* <p className="text-lg font-semibold py-4 text-blue underline">
          Location:
        </p> */}
      <div className="flex gap-1 items-center justify-between">
        <p
          onClick={handleGetLocation}
          className="font-medium text-blue underline leading-[1.3rem] "
        >
          Open Maps
        </p>
        <img
          src={crosss}
          alt=""
          className="w-5 h-5 rounded-full p-[0.1rem] "
          onClick={cross}
        />
        {/* <img src={mapp} alt="" className="h-5 w-5" /> */}
      </div>
    </div>
  );
}

export default CurrentLocMap;
