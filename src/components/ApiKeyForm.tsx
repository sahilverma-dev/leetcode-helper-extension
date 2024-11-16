import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClipboardIcon } from "lucide-react";
import { toast } from "sonner";
import { useBot } from "@/hooks/useBot";

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
});

const ApiKeyForm = () => {
  const { setApiKey } = useBot();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("apiKey", values.apiKey);
    setApiKey(values.apiKey);
    toast.success("API Key saved successfully");
  }

  async function handlePaste() {
    const apiKey = await navigator.clipboard.readText();
    if (apiKey) {
      form.setValue("apiKey", apiKey);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter your API Key" {...field} />
                  <Button
                    size={"icon"}
                    variant="outline"
                    onClick={handlePaste}
                    type="button"
                    className="text-xs aspect-square px-0"
                  >
                    <ClipboardIcon />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
export default ApiKeyForm;
