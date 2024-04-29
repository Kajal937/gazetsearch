import axios from "axios";
import { toast } from "react-toastify";

export function getHeaders() {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem("token");
  }
  const headers = {
    Authorization: `Bearer ${token}` || "",
    "Content-Type": "application/json",
  };
  return headers;
}

export function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
  props
) {
  return new Promise((resolve, reject) => {
    headers = {
      ...getHeaders(),
      ...headers,
    };
    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        params: data,
        headers,
        data: {},
      };
    }
    axios[method](endPoint, data, { headers })
      .then((result) => {
        if (method != "get") {
          toast.success(result?.data?.message || "Successfully", {
            position: "top-center",
            autoClose: 600,
          });
        }
        const { data } = result;
        if (data?.status === false) {
          return reject(data);
        }
        return resolve(data);
      })
      .catch((error) => {
        if (method != "get") {
          toast.error(
            error?.response?.data?.message ||
              "Something went wrong, please try after sometime"
          );
        }
        return reject(error);
      });
  });
}
export function getMethod(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}
export async function postMethod(endPoint, data, headers = {}, requestOptions) {
  return await apiReq(endPoint, data, "post", headers, requestOptions);
}
export async function patchMethod(
  endPoint,
  data,
  headers = {},
  requestOptions
) {
  return await apiReq(endPoint, data, "patch", headers, requestOptions);
}
export async function putMethod(endPoint, data, headers = {}, requestOptions) {
  return await apiReq(endPoint, data, "put", headers, requestOptions);
}
export async function deleteMethod(
  endPoint,
  data,
  headers = {},
  requestOptions
) {
  return await apiReq(endPoint, data, "delete", headers, requestOptions);
}
