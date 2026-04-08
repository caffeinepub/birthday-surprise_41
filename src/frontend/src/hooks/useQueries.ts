import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Reply } from "../backend.d.ts";

// Re-export Reply type for use in components
export type { Reply };

interface Wish {
  name: string;
  message: string;
}

function useBackendActor() {
  return useActor(createActor);
}

export function useGetAllWishes() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Wish[]>({
    queryKey: ["wishes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWishes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWish() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; message: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addWish(data.name, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}

export function useGetBirthdayDate() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string>({
    queryKey: ["birthdayDate"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getBirthdayDate();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllReplies() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Reply[]>({
    queryKey: ["replies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReplies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveReply() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveReply(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
  });
}
