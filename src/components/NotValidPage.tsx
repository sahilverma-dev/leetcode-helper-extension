const NotValidPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background p-4">
      <img
        src="/icons/icon128.png"
        alt=""
        className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4"
      />

      <h1 className="text-lg  md:text-3xl font-bold mb-3 md:mb-6 text-gray-800 dark:text-gray-100 text-center">
        Oops! You're Not on a LeetCode Problem Page
      </h1>
      <p className="text-xs md:text-lg mb-8 text-gray-600 dark:text-gray-300 text-center max-w-md">
        It looks like you're not currently viewing a LeetCode problem. To use
        the LeetCode Assistant:
      </p>
      <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 mb-8 space-y-2">
        <li>
          Visit{" "}
          <a
            href="https://leetcode.com/problems/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode Problems
          </a>
        </li>
        <li>Select any problem</li>
        <li>The assistant will be ready to help!</li>
      </ol>
      <div className="relative mb-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0a/LeetCode_Logo_black_with_text.svg"
          alt="LeetCode Logo"
          className="h-10 dark:hidden transition-transform object-contain hover:scale-105 duration-300"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c2/LeetCode_Logo_2.png"
          alt="LeetCode Logo"
          className="h-10 hidden dark:block object-contain transition-transform hover:scale-105 duration-300"
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Happy coding! We're here to assist when you're ready.
      </p>
    </div>
  );
};

export default NotValidPage;
