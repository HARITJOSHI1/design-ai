"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateProject = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (prompt: string) => {
      return await axios.post("/api/project", { prompt });
    },
    onSuccess: (data) => {
      router.push(`/project/${data.data.data.id}`);
    },

    onError: (err) => {
      console.log("Project failed", err);
      toast.error("Failed to create project");
    },
  });
};

export const useGetProjects = (userId?: string) => {
  return useQuery({
    queryKey: ["projects", userId],
    queryFn: async () => (await axios.get("/api/project")).data.data,

    enabled: !!userId,
  });
};
