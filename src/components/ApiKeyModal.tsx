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
          <DialogTitle>Enter your open ai api key</DialogTitle>
          <DialogDescription>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              className={buttonVariants({
                variant: "link",
                className: "text-sm px-0",
              })}
            >
              Click here
            </a>{" "}
            to get your api key
          </DialogDescription>
        </DialogHeader>
        <ApiKeyForm />
      </DialogContent>
    </Dialog>
  );
};
export default ApiKeyModal;
