import { EXPIRY_TIME_IN_HOURS } from "../constants/data";

export const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + "; path=/";
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts[1].split(";")[0];

    try {
      const decodedData = decodeURIComponent(cookieValue);
      const parsedValue = JSON.parse(decodedData);
      const currentTime = Date.now();

      if (
        currentTime >
        parsedValue.timestamp + Number(EXPIRY_TIME_IN_HOURS) * 60 * 60 * 1000
      ) {
        deleteCookie(name);
        return null;
      }

      return decodedData;
    } catch (error) {
      console.error("Error parsing cookie value:", error);
      return null;
    }
  }

  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};
