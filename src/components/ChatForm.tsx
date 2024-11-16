// import { OpenAI } from "openai";
import { useBot } from "@/hooks/useBot";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
import { toast } from "sonner";
import { useMutation } from "@/hooks/useMutation";

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

const apiKey = "AIzaSyDP3iUXTanuLH8ObYGR7rTi6xwOO6yaXYw";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const ChatForm = () => {
  // @ts-ignore
  const { apiKey, problemData } = useBot();

  if (!problemData) return null;

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      const systemPromptModified = SYSTEM_PROMPT.replace(
        "{{problem_statement}}",
        problemData?.content
      )
        .replace("{{programming_language}}", problemData?.language)
        .replace("{{user_code}}", problemData?.code);

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      return chatSession.sendMessage(systemPromptModified);
    },

    onSuccess: (data) => {
      console.log(data.response.text());
      const response = data.response.text();
      if (problemData?.id) {
        chrome.storage.local.get([problemData.id], (result) => {
          const existingChats = result[problemData.id] || [];
          const newChats = [
            ...existingChats,
            {
              by: "bot",
              message: response,
              type: "markdown",
            },
          ];
          chrome.storage.local.set({ [problemData.id]: newChats });
        });
      }
      toast.success("Message sent successfully");
    },

    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    if (problemData?.id) {
      chrome.storage.local.get([problemData.id], (result) => {
        const existingChats = result[problemData.id] || [];
        const newChats = [
          ...existingChats,
          {
            by: "user",
            message: value.message,
            type: "text",
          },
        ];
        chrome.storage.local.set({ [problemData.id]: newChats });
      });
    }
    mutate(value.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2 w-full">
                  <Input
                    placeholder="How can I help you?"
                    className="flex-grow text-sm"
                    {...field}
                  />
                  <Button
                    size={"sm"}
                    className="px-0 aspect-square text-sm"
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
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ChatForm;
