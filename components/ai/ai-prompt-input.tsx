import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { CornerDownLeftIcon } from "lucide-react";

type Props = {
  promptText: string;
  setPromptText: (text: string) => void;
  className?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  hideSubmitBtn?: false;
};

const AIPromptInput = ({
  promptText,
  setPromptText,
  className,
  isLoading,
  onSubmit,
  hideSubmitBtn = false,
}: Props) => {
  return (
    <div className="bg-background p-2 md:p-0">
      <InputGroup
        className={cn(
          "min-h-[172px] rounded-2xl! bg-background outline-none",
          className && className
        )}
      >
        <InputGroupTextarea
          className="text-base! py-2.5! outline-none!"
          placeholder="I want to design a ui that ..."
          onChange={(e) => {
            setPromptText(e.target.value);
          }}
        />

        <InputGroupAddon
          align="block-end"
          className="flex items-center justify-end"
        >
          {!hideSubmitBtn && (
            <InputGroupButton
              variant="default"
              className=""
              size="sm"
              disabled={!promptText?.trim() || isLoading}
              onClick={() => onSubmit?.()}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Design
                  <CornerDownLeftIcon className="size-4" />
                </>
              )}
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default AIPromptInput;
