import { TooltipProvider } from "../ui/tooltip";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ReactQueryProvider>
            {children}
            <Toaster
              richColors
              position="top-center"
              toastOptions={{
                duration: 1000,
              }}
            />
          </ReactQueryProvider>
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
};

export default Providers;
