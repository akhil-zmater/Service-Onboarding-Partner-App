import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import crosss from "../images/crossicon.svg";

interface MapsProps {
  cross: (e: React.MouseEvent<HTMLImageElement>) => void;
}

function Maps({ cross }: MapsProps) {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("Error getting location", error);
        setCurrentPosition({ lat: 17.385044, lng: 78.486671 });
      }
    );
  }, []);

  const handleCurrentLoc = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  };

  return (
    <div className="bg-white pb-2 px-2 w-full ml-3 mr-2 h-max rounded-lg font-poppins ">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold py-4 text-blue underline">
          Location:
        </p>
        <img
          src={crosss}
          alt=""
          className="w-5 h-5 rounded-full"
          onClick={cross}
        />
      </div>
      <div className="shadow-xl rounded-lg h-96">
        <LoadScript googleMapsApiKey="AIzaSyAzSqpJ-p03fX8AeKhrIGfxRSpi1ercS10">
          {currentPosition ? (
            <GoogleMap
              mapContainerClassName="w-full h-full rounded-lg shadow-lg"
              center={currentPosition}
              zoom={15}
              clickableIcons={true}
            >
              <Marker
                onClick={handleCurrentLoc}
                draggable={true}
                position={currentPosition}
              />
            </GoogleMap>
          ) : (
            <p>Loading Map...</p>
          )}
        </LoadScript>
      </div>
    </div>
  );
}

export default Maps;
