import { useMutation } from "@tanstack/react-query";
import { deleteMethod, postMethod } from "../utility/api/method";
import axios from "axios";

// UPLOAD IMAGE AWS S3 BUCKET
export const uploadMutation = async (file) => {
  return axios.post(`${process.env.BE_URL}/upload`, file)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};


export const useUploadApi = () =>
  useMutation({
    mutationFn: (file) => {
      const data = postMethod(`${process.env.BE_URL}/upload`, file);
      return data;
    },
  });

// UPLOAD MULTIPLE IMAGE AWS S3 BUCKET
export const useUploadMultipleApi = () =>
  useMutation({
    mutationFn: (file) => {
      const data = postMethod(
        `${process.env.BE_URL}/upload/multiple/upload-multiple`,
        file,
        {
          headers,
        }
      );
      return data;
    },
  });


// DELETE IMAGE AWS S3 BUCKET
export const useDeleteImgApi = () =>
  useMutation({
    mutationFn: (imgUrl) => {
      const data = deleteMethod(`${process.env.BE_URL}/upload/delete/${imgUrl}`);
      return data;
    },
  });