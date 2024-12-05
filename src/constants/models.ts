export const MODELS: { model: string; name: Model; display: string }[] = [
  {
    model: "gemini-1.5-flash",
    name: "gemini_1.5_flash",
    display: "Gemini 1.5 Flash",
  },
  {
    model: "gpt-3.5-turbo",
    name: "openai_3.5_turbo",
    display: "GPT-3.5 Turbo",
  },
  {
    model: "gpt-4o",
    name: "openai_4o",
    display: "GPT-4 Optimized",
  },
  {
    model: "gemini-1.5-pro-latest",
    name: "gemini_1.5_pro",
    display: "Gemini 1.5 Pro (Latest)",
  },
  {
    model: "claude-3-haiku-20240307",
    name: "claude_3_haiku",
    display: "Claude 3 Haiku",
  },
  {
    model: "claude-3-5-sonnet-20241022",
    name: "claude_3_sonnet",
    display: "Claude 3 Sonnet",
  },
];

/**
 * Type of valid models that can be used in the application.
 */
export type Model =
  | "gemini_1.5_flash"
  | "openai_3.5_turbo"
  | "openai_4o"
  | "gemini_1.5_pro"
  | "claude_3_haiku"
  | "claude_3_sonnet";
