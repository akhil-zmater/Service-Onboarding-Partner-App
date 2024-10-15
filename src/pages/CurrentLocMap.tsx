import React from "react";
import crosss from "../images/crossicon.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface CurrentLocMapProps {
  cross: (e: React.MouseEvent<HTMLImageElement>) => void;
  latitude: number;
  longitude: number;
  dragHandler: (e: google.maps.MapMouseEvent) => void;
}

function CurrentLocMap({
  cross,
  dragHandler,
  latitude,
  longitude,
}: CurrentLocMapProps) {
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
          {latitude !== undefined ? (
            <GoogleMap
              mapContainerClassName="w-full h-full rounded-lg shadow-lg"
              center={{ lat: latitude, lng: longitude }}
              zoom={15}
              clickableIcons={true}
            >
              <Marker
                onClick={() => {}}
                draggable={true}
                onDragEnd={dragHandler}
                position={{ lat: latitude, lng: longitude }}
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

export default CurrentLocMap;
