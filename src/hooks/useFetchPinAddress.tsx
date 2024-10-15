import React from "react";
import axios from "axios";

interface FetchDistanceProps {
  latitude: number;
  longitude: number;
}

const useFetchPinAddress = (props: FetchDistanceProps) => {
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(true);

  const MAP_KEY = "AIzaSyAzSqpJ-p03fX8AeKhrIGfxRSpi1ercS10";

  React.useEffect(() => {
    const fetchAddress = async () => {
      if (
        props.latitude !== undefined &&
        props.longitude !== undefined &&
        props !== undefined
      ) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.latitude},${props.longitude}&key=${MAP_KEY}`
          );
          const results = response.data.results;
          if (results.length > 0) {
            setAddress(results[0].formatted_address);
          } else {
            setError("No address found for the given location.");
          }
        } catch (error) {
          setError("Error fetching address: " + error);
        } finally {
          setLoading(false); // Set loading to false when request is complete
        }
      }
    };

    fetchAddress();
  }, [props.latitude, props.longitude]);
  return { address, error, loading };
};
export default useFetchPinAddress;
