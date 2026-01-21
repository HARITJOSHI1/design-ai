"use client";
import AIPromptInput from "@/components/ai/ai-prompt-input";
import React, { useState } from "react";
import { Libre_Baskerville } from "next/font/google";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { suggestions } from "@/lib/constants/suggestions";
import { Spotlight } from "@/components/ui/spotlight-new";
import Header from "@/components/common/header";
import { useCreateProject, useGetProjects } from "@/hooks/project/use-project";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Spinner } from "@/components/ui/spinner";
import { ProjectType } from "@/lib/types/t.project";
import ProjectCard from "./_components/project-card";

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "400"],
});

const page = () => {
  const { user } = useKindeBrowserClient();
  const [promptText, setPromptText] = useState("");

  const { mutate, isPending } = useCreateProject();
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjects(user?.id);

  const handleSuggestionClick = (value: string) => {
    setPromptText(value);
  };
  const handleSubmit = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <Header />

        <div className="relative overflow-hidden pt-28">
          <Spotlight />
          <div
            className="max-w-6xl mx-auto flex flex-col
         items-center justify-center gap-8
        "
          >
            <div className="space-y-3">
              <h1
                className="text-center font-semibold text-5xl
            tracking-tight sm:text-6xl
            "
              >
                Design mobile apps <br className="md:hidden" />
                <span
                  className={`text-primary italic! ${libreBaskerville.className}`}
                >
                  in minutes
                </span>
              </h1>
              <div className="mx-auto max-w-2xl ">
                <p className="text-center text-lg text-foreground leading-relaxed sm:text-lg">
                  Go from idea to beautiful app mockups in minutes by chatting
                  with AI.
                </p>
              </div>
            </div>

            <div className="flex w-full max-w-3xl flex-col iten-center gap-8 relative z-50">
              <div className="w-full">
                <AIPromptInput
                  className="ring-2 ring-primary rounded-3xl"
                  promptText={promptText}
                  setPromptText={setPromptText}
                  isLoading={isPending}
                  onSubmit={handleSubmit}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 px-5">
                <Suggestions>
                  {suggestions.map((s) => (
                    <Suggestion
                      key={s.label}
                      suggestion={s.label}
                      className="text-xs! h-7! px-2.5 pt-1!"
                      onClick={() => handleSuggestionClick(s.value)}
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </Suggestion>
                  ))}
                </Suggestions>
              </div>
            </div>

            <div
              className="absolute -translate-x-1/2
             left-1/2 w-[5000px] h-[3000px] top-[80%]
             -z-10"
            >
              <div
                className="-translate-x-1/2 absolute
               bottom-[calc(100%-300px)] left-1/2
               h-[2000px] w-[2000px]
               opacity-20 bg-radial-primary"
              ></div>
              <div
                className="absolute -mt-2.5
              size-full rounded-[50%]
               bg-primary/20 opacity-70
               [box-shadow:0_-15px_24.8px_var(--primary)]"
              ></div>
              <div
                className="absolute z-0 size-full
               rounded-[50%] bg-background"
              ></div>
            </div>
          </div>
        </div>

        <div className="w-full py-10">
          <div className="mx-auto max-w-3xl">
            {user?.id && (
              <div>
                <h1
                  className="font-medium text-xl
              tracking-tight
              "
                >
                  Recent Projects
                </h1>

                {isLoading ? (
                  <div
                    className="flex items-center
                  justify-center py-2
                  "
                  >
                    <Spinner className="size-10" />
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2
                  md:grid-cols-3 gap-3 mt-3
                    "
                  >
                    {projects?.map((project: ProjectType) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {isError && <p className="text-red-500">Failed to load projects</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
