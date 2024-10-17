import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import crosss from "../images/crossicon.svg";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";

interface MapsProps {
  cross: (e: React.MouseEvent<HTMLImageElement>) => void;
  latitude: number;
  longitude: number;
}

function Maps({ cross, latitude, longitude }: MapsProps) {
  const isMobile = useCheckMobileScreen();
  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const googleMapsAppUrl = `comgooglemaps://?q=${latitude},${longitude}`;
    if (isMobile) {
      window.location.href = googleMapsAppUrl;

      setTimeout(() => {
        window.open(googleMapsUrl, "_blank");
      }, 200);
    } else {
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <div className="bg-white pb-2 px-2 w-full ml-3 mr-2 h-max rounded-lg font-poppins ">
      <div className="flex justify-between items-center">
        <p
          onClick={handleMarkerClick}
          className="text-lg font-semibold py-4 text-blue underline"
        >
          Open Google Maps
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
          {latitude ? (
            <GoogleMap
              mapContainerClassName="w-full h-full rounded-lg shadow-lg"
              center={{ lat: latitude, lng: longitude }}
              zoom={15}
              clickableIcons={true}
            >
              <Marker
                draggable={true}
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

export default Maps;
