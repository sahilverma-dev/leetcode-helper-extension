import { FaGithub as GithubIcon } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <div className="text-sm p-2 border-b flex items-center justify-between">
      <p className="font-bold px-2">Leetcode ChatGPT</p>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sahilverma-dev/Leetcode-ChatGPT"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            className: "px-0 text-sm aspect-square !rounded-full",
          })}
        >
          <GithubIcon />
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Header;
