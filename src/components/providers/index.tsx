import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
        <Toaster richColors />
      </ThemeProvider>
    </>
  );
};

export default Providers;
