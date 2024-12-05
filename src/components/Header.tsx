import { motion } from "framer-motion";
// import { FaGithub as GithubIcon } from "react-icons/fa";
// import ThemeToggle from "./ThemeToggle";

// import { buttonVariants } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODELS } from "@/constants/models";

interface Props {
  selectedModel: string;
  onChangeModel: (model: string) => void;
}

const Header: React.FC<Props> = ({ selectedModel, onChangeModel }) => {
  return (
    <div className="text-sm p-2 border-b flex items-center justify-between">
      <p className="font-bold px-2 flex items-center gap-2">
        <motion.img
          layout
          layoutId="icon"
          src="https://raw.githubusercontent.com/sahilverma-dev/leetcode-helper-extension/refs/heads/main/public/icons/icon128.png"
          alt="Leetcode Helper Bot"
          className="w-6 h-6 md:w-8 md:h-8"
        />
        Leetcode Helper Bot
      </p>

      <Select value={selectedModel} onValueChange={onChangeModel}>
        <SelectTrigger className="w-[180px] truncate text-xs">
          <SelectValue placeholder="Select a your model" />
        </SelectTrigger>
        <SelectContent>
          {MODELS.map((model) => (
            <SelectItem value={model.model}>{model.display}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <div className="flex items-center gap-2">
        <a
          href="https://github.com/sahilverma-dev/leetcode-helper-extension"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            className: "px-0 text-sm aspect-square !rounded-full",
          })}
        >
          <GithubIcon />
        </a>
        <ThemeToggle className="rounded-full" />
      </div> */}
    </div>
  );
};
export default Header;
