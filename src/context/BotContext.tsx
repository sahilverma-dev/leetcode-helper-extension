import { createContext } from "react";

interface IBotContext {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  isValidPage: boolean;
  setIsValidPage: (isValidPage: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const BotContext = createContext<IBotContext>({
  apiKey: "",
  isValidPage: false,
  isLoading: true,
  setApiKey: () => {},
  setIsValidPage: () => {},
  setIsLoading: () => {},
});
