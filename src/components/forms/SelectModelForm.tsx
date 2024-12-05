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
    .max(256, "API key cannot exceed 256 characters"),
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

import { MODELS } from "@/constants/models";
import { PasswordInput } from "../ui/ password-input";
import { toast } from "sonner";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SelectModelForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      apiKey: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success("Model and API key saved successfully!", {
      position: "top-center",
    });

    // save model and api key to chrome storage
    chrome.storage.local.set({
      model: values.model,
      [values.model]: values.apiKey,
    });
  }

  useEffect(() => {
    chrome.storage.local.get("model", (result) => {
      const currentModel = result.model || MODELS[0].model;
      form.setValue("model", currentModel);

      chrome.storage.local.get(currentModel, (apiKeyResult) => {
        form.setValue("apiKey", apiKeyResult[currentModel]);
      });

      setIsLoading(false);
    });
  }, [form]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2Icon className="animate-spin text-primary" />
      </div>
    );
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

              <Select
                onValueChange={(e) => {
                  chrome.storage.local.get(e, (result) => {
                    if (result[e]) {
                      form.setValue("apiKey", result[e]);
                    } else {
                      form.setValue("apiKey", "");
                    }
                  });
                  field.onChange(e);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    value={field.value}
                    className="rounded-full text-sm"
                  >
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
