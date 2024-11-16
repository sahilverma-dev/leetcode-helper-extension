import { ProblemData } from "@/types/problem";
import { createContext } from "react";

interface IBotContext {
  apiKey: string;
  isValidPage: boolean;
  isLoading: boolean;
  problemData: ProblemData | null;
  setApiKey: (apiKey: string) => void;
  setIsValidPage: (isValidPage: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setProblemData: (problemData: ProblemData | null) => void;
}

export const BotContext = createContext<IBotContext>({
  apiKey: "",
  isValidPage: false,
  isLoading: true,
  problemData: null,
  setApiKey: () => {},
  setIsValidPage: () => {},
  setIsLoading: () => {},
  setProblemData: () => {},
});
