import { BotContext } from "@/context/BotContext";
import { useContext } from "react";

export const useBot = () => {
  const context = useContext(BotContext);

  if (context === undefined)
    throw new Error("useBot must be used within a BotProvider");

  return context;
};
