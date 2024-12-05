import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

interface Props {
  isLoading?: boolean;
  onSend: (message: string) => void;
}

const ChatForm: React.FC<Props> = ({ onSend, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    if (!isLoading) {
      onSend(value.message);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-t p-2"
      >
        <FormField
          control={form.control}
          name="message"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <div className="flex items-center gap-2 w-full">
                  <Input
                    placeholder="How can I help you?"
                    className="flex-grow text-sm rounded-full"
                    {...field}
                  />
                  <Button
                    size={"sm"}
                    className="px-0 aspect-square text-sm rounded-full"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      <SendIcon />
                    )}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ChatForm;
