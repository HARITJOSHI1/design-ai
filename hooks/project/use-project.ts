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

export const useGetProjectWithId = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => (await axios.get(`/api/project/${id}`)).data.data,

    enabled: !!id,
  });
};


export const useGenerateDesignById = (id: string) => {
  return useMutation({
    mutationFn: async (prompt: string) => {
      return await axios.post(`/api/project/${id}`, { prompt });
    },
    onSuccess: (data) => {
      toast.success("Generation started");
    },

    onError: (err) => {
      console.log("Project failed", err);
      toast.error("Failed to generate a screen");
    },
  });
};



export const useUpdateProject = (id: string) => {
  return useMutation({
    mutationFn: async (themeId: string) => {
      return await axios.patch(`/api/project/${id}`, { themeId });
    },
    onSuccess: (data) => {
      toast.success("Project updated");
    },

    onError: (err) => {
      console.log("Project failed", err);
      toast.error("Failed to update project");
    },
  });
};