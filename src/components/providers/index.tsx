import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import BotProvider from "./BotProvider";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <BotProvider>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </BotProvider>
  );
};
export default Providers;
