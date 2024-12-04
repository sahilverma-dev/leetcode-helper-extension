import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const formSchema = z.object({
//   model: z.string({ message: "Model is required" }),
//   apiKey: z.string({ message: "API Key is required" }),
// });

const formSchema = z.object({
  model: z
    .string({
      required_error: "Model name is required",
      invalid_type_error: "Model must be a string",
    })
    .min(1, "Model name cannot be empty")
    .refine(
      (value) => value.trim().length > 0,
      "Model name cannot be just whitespace"
    ),

  apiKey: z
    .string({
      required_error: "API key is required",
      invalid_type_error: "API key must be a string",
    })
    .min(10, "API key must be at least 10 characters")
    .max(256, "API key cannot exceed 256 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "API key can only contain letters, numbers, underscores, and hyphens"
    ),
});

// components
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { MODELS } from "@/constants/modals";
import { PasswordInput } from "../ui/ password-input";
import { toast } from "sonner";
import { SaveIcon } from "lucide-react";

const SelectModelForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "gpt-3.5-turbo",
      apiKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (!form.formState.isValid) {
      toast.error("Please fill out all fields.", {
        position: "top-left",
        closeButton: true,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-xs w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-full text-sm">
                    <SelectValue placeholder="Select your preferred model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MODELS.map((model) => (
                    <SelectItem key={model.model} value={model.model}>
                      {model.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your API key"
                  {...field}
                  className="rounded-full text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full w-full ">
          <SaveIcon />
          Save your API
        </Button>
      </form>
    </Form>
  );
};

export default SelectModelForm;
