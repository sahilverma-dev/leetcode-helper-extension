import { FaGithub as GithubIcon } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

import { buttonVariants } from "./ui/button";

const Header = () => {
  return (
    <div className="text-sm p-2 border-b flex items-center justify-between">
      <p className="font-bold px-2 flex items-center gap-2">
        <img
          src="/icons/icon128.png"
          alt="Leetcode Helper Bot"
          className="w-6 h-6 md:w-8 md:h-8"
        />
        Leetcode Helper Bot
      </p>
      <div className="flex items-center gap-2">
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
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Header;
