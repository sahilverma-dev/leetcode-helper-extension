import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "./ui/button";

import ApiKeyForm from "./ApiKeyForm";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%]">
        <DialogHeader>
          <DialogTitle>Enter your Gemini API Key</DialogTitle>
          <DialogDescription>
            Don't have a Gemini API key? You can get one for free with limited
            credits from{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              className={buttonVariants({
                variant: "link",
                className: "text-sm !px-0",
              })}
            >
              Google AI
            </a>
            .
          </DialogDescription>
        </DialogHeader>
        <ApiKeyForm />
      </DialogContent>
    </Dialog>
  );
};
export default ApiKeyModal;
