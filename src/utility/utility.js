import qs from "query-string";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import { cookies } from 'next/headers'
export function validateName(value) {
  let error;
  const regex = /^[A-Za-z -]+$/;
  if (!value) {
    error = "Name is required";
  } else if (!regex.test(value)) {
    error = "Enter valid name containing only alphabets, spaces, and hyphens";
  }
  return error;
}

export function validateEmail(value) {
  let error;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!value) {
    error = "Email is required";
  } else if (!emailRegex.test(value)) {
    error = "Invalid email";
  }
  return error;
}

export function validateRequiredField(value) {
  let error;
  if (!value?.trim()) {
    error = "Enter value is required";
  }
  return error;
}

export function validateRequiredSelectField(value) {
  let error;
  if (!value) {
    error = "Select value is required";
  }
  return error;
}

export function validateRequiredNumberField(value) {
  let error;
  const regex = /^[0-9]*$/;
  if (!regex?.test(value)) {
    error = "Enter valid numeric value";
  }
  return error;
}

export function validatePhoneNumber(value) {
  let error;
  const regex = /^[0-9]{10,15}$/;
  if (!value) {
    error = "Phone Number is required";
  } else if (!regex?.test(value)) {
    error = "Enter a valid mobile number";
  }
  return error;
}

export function validatePassword(value) {
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
  let error;
  if (!value?.trim()) {
    error = "Password is required";
  } else if (!validPassword.test(value)) {
    error =
      "Password should have at least 8 characters (capital letter, lowercase letter, special character, numeric character)";
  }
  return error;
}

export async function compressImage(blob, targetSize, quality) {
  while (blob.size > targetSize) {
    const image = new Image();
    const url = URL.createObjectURL(blob);
    image.src = url;

    await new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width * 0.9; // Reduce image dimensions
        canvas.height = image.height * 0.9;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (newBlob) => {
            URL.revokeObjectURL(url);
            blob = newBlob;
            resolve();
          },
          "image/jpeg",
          quality
        );
      };
    });
  }
  return new File([blob], "compressed.jpg", { type: "image/jpeg" });
}

export function createQueryString(queries) {
  const queryString = Object.entries(queries)
    .map(
      ([name, value]) =>
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryString;
}

// Get the data from localStorage

export const themeFromLocalStorage = (() => {
  if (typeof window !== "undefined") {
    const localStorageData = localStorage.getItem("webTheme");
    if (localStorageData) {
      try {
        return JSON.parse(localStorageData);
      } catch (error) {
        // Handle the error if the stored data is not valid JSON
      }
    }
  }
  return null;
})();

// FIRST LETTER UPPERCASE
export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};

// get theme from localstorage
export const getThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Retrieve the theme data from localStorage
    const storedThemeString = localStorage.getItem("globalTheme");
    const storedTheme = JSON.parse(storedThemeString);
    return storedTheme;
  }
};

export const fetchValuesJsonFromLocalStorage = (name) => {
  // if (typeof window !== "undefined") {
  //   const info = localStorage.getItem(name);
  //   const qs = JSON.parse(info);
  //   return qs;
  // }
  const info = getCookie(name);
  // const jsonObject = eval("(" + info + ")");
  return info;

  
  // try {
  // const info = getCookie(name);
  //   const jsonObject = JSON.parse(info);
  //   return jsonObject
  // } catch (error) {
  // }
};

export const setValueInLocalStorage = (name, values) => {
  // if (typeof window !== "undefined") {
  //   localStorage.setItem(name, values);
  // }
  // cookies().set(name, values)
  setCookie(name, values);
};

export const removeValueInLocalStorage = (name) => {
  // cookies().delete(name)
  deleteCookie(name);
  // if (typeof window !== "undefined") {
  //   localStorage.removeItem(name);
  // }
};

export async function compressImageSize(blob, targetSize, quality) {
  while (blob?.size > targetSize) {
    const image = new Image();
    const url = URL.createObjectURL(blob);
    image.src = url;

    await new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width * 0.9; // Reduce image dimensions
        canvas.height = image.height * 0.9;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (newBlob) => {
            URL.revokeObjectURL(url);
            blob = newBlob;
            resolve();
          },
          "image/jpeg",
          quality
        );
      };
    });
  }
  return new File([blob], Math.random().toString(36).substring(10), {
    type: "image/jpeg",
  });
}

// check the object length in number
export const isObjectEmpty = (obj) => {
  return Object.keys(obj)?.length;
};

// convert the object is query string
export const convertValuesQueryString = (query) => {
  Object.keys(query)?.forEach((value) => {
    if (!query[value]) delete query[value];
  });
  return isObjectEmpty(query) ? `?${qs.stringify(query)}` : "";
};

export const arrayTop = (data, name) => {
  // Find the index of the object with name "iphone"
  const index = data?.findIndex((item) => item?.name?.toLowerCase() === name);
  // If the object is found, move it to the first position
  if (index !== -1) {
    const iphoneObject = data?.splice(index, 1)[0];
    data?.unshift(iphoneObject);
  }
  return data;
};

// WHEN SINGLE VALUE CONVERT IN ARRAY
export const convertValuesArray = (values) => {
  if (typeof values === "string") {
    return [values];
  } else {
    return values;
  }
};
