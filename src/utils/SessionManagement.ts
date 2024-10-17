import { EXPIRY_TIME_IN_HOURS } from "../constants/data";

interface CookieData {
  timeStamp: number;
  value: string;
}

export const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();

  const cookieData: CookieData = { timeStamp: Date.now(), value };

  console.log("cookieData: ", cookieData);

  document.cookie =
    name +
    "=" +
    encodeURIComponent(JSON.stringify(cookieData)) +
    expires +
    "; path=/";
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  console.log("parts: ", parts);

  if (parts.length === 2) {
    const cookieValue = parts[1].split(";")[0];

    try {
      const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
      const currentTime = Date.now();

      console.log("parsedValue: ", parsedValue);

      if (
        currentTime >
        parsedValue.timestamp + Number(EXPIRY_TIME_IN_HOURS) * 60 * 60 * 1000
      ) {
        deleteCookie(name);
        return null;
      }

      return parsedValue.value;
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
