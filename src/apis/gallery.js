import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "../utility/api/method";
import qs from "query-string";
import { convertValuesQueryString } from "@/utility/utility";

// gallery  use
export const useGallerylQuery = () =>
  useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const data = await getMethod(`${process.env.BE_URL}/gallery`);
      return data;
    },
    // enabled: !!id,
  });

// gallery post use
export const useCreateGalleryMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = postMethod(`${process.env.BE_URL}/gallery`, payload);
      return data;
    },
  });

// gallery put use
export const useUpdateGalleryMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = putMethod(
        `${process.env.BE_URL}/gallery/${payload?._id}`,
        payload
      );
      return data;
    },
  });

// gallery delete use
export const useDeleteGalleryMutation = () =>
  useMutation({
    mutationFn: (id) => {
      const data = deleteMethod(`${process.env.BE_URL}/gallery/${id}`);
      return data;
    },
  });
