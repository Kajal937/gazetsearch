import { useMutation, useQuery } from "@tanstack/react-query";
import { getMethod, postMethod, putMethod } from "../utility/api/method";
import qs from 'query-string'

export const useContactQuery = (payload) => 
  useQuery({
      queryKey: ["contact", payload],
      queryFn: async () => {
        const data = await getMethod(`${process.env.BE_URL}/contact${payload ? `?${qs.stringify(payload)}` : ""}`);
        return data;
      },
      enabled: !!payload
  });
  

export const useCreateContactMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = postMethod(`${process.env.BE_URL}/contact`, payload);
      return data;
    },
});

export const useUpdateContactMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = putMethod(`${process.env.BE_URL}/contact/${payload?._id}`, payload);
      return data;
    },
});