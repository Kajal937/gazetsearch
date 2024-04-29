import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMethod,
  getMethod,
  postMethod,
  putMethod,
} from "../utility/api/method";
import qs from "query-string";
import { convertValuesQueryString } from "@/utility/utility";

export const useBlogsQuery = (query) => {
  const queryFn = async ({ pageParam = 1 }) => {
    const payload = {
      ...query,
      limit: 12,
      page: pageParam,
    };
    const data = await getMethod(`${process.env.BE_URL}/blog${payload ? `?${qs.stringify(payload)}` : ""}`);
    return {
      data: data?.data,
      total: data?.total,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery({
    queryKey: ["blogs", query],
    queryFn: queryFn,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 7) return undefined;
      return lastPage.nextPage;
    },
  });
};

// blog fetch use
export const useBlogQuery = (payload) =>
  useQuery({
    queryKey: ["blog", payload],
    queryFn: async () => {
      const data = await getMethod(`${process.env.BE_URL}/blog${payload ? `?${qs.stringify(payload)}` : ""}`);
      return data;
    },
    // enabled: !!payload
  });

// blog Detail use
export const useBlogDetailQuery = (id) =>
  useQuery({
    queryKey: ["blogDetail", id],
    queryFn: async () => {
      const data = await getMethod(`${process.env.BE_URL}/blog/${id}`);
      return data;
    },
    // enabled: !!id,
  });

// blog post use
export const useCreateBlogMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = postMethod(`${process.env.BE_URL}/blog`, payload);
      return data;
    },
  });

// blog put use
export const useUpdateBlogMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = putMethod(
        `${process.env.BE_URL}/blog/${payload?._id}`,
        payload
      );
      return data;
    },
  });

// blog delete use
export const useDeleteBlogMutation = () =>
  useMutation({
    mutationFn: (id) => {
      const data = deleteMethod(`${process.env.BE_URL}/blog/${id}`);
      return data;
    },
  });
