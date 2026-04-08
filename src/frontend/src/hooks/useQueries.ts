// No backend methods are used in this app — all content is static.
// Stub hooks are kept to satisfy BirthdayWishes component imports.
import { useMutation, useQuery } from "@tanstack/react-query";

interface Wish {
  name: string;
  message: string;
}

export function useGetAllWishes() {
  return useQuery<Wish[]>({
    queryKey: ["wishes"],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useAddWish() {
  return useMutation({
    mutationFn: async (_data: { name: string; message: string }) => {
      // no-op stub
    },
  });
}

export function useGetBirthdayDate() {
  return useQuery<string>({
    queryKey: ["birthdayDate"],
    queryFn: async () => "",
    enabled: false,
  });
}
