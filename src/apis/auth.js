import { useMutation } from "@tanstack/react-query";
import { postMethod } from "../utility/api/method";


export const useLoginMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = postMethod(`${process.env.BE_URL}/auth/login`, payload);
      return data;
    }
});


export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (payload) => {
      const data = postMethod(`${process.env.BE_URL}/auth/register`, payload);
      return data;
    }
});