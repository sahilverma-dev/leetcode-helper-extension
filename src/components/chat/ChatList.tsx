import { useBot } from "@/hooks/useBot";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";

export interface Chat {
  by: "bot" | "user";
  message: string;
  type: "text" | "markdown";
}

// const op = {
//   output:
//     "Let's tackle this Sudoku solver step-by-step.  It's a classic backtracking problem.\n\n**Hint 1:** Consider using a recursive backtracking approach.  Think about how you can systematically try placing numbers (1-9) in empty cells, checking for validity at each step. A helper function to check validity would be useful.\n\n**Hint 2:** Break down the problem into these sub-problems:\n\n1.  **`isValid(board, row, col, num)`:** A function to check if placing `num` at `board[row][col]` is valid according to Sudoku rules. This involves checking the row, column, and 3x3 subgrid.\n2.  **`solve()` (recursive):** A recursive function that iterates through the board. If it finds an empty cell (`.`), it tries placing numbers 1-9. If `isValid()` returns `true` for a number, it recursively calls `solve()` with the updated board. If no valid number can be placed, it backtracks (undoes the placement and tries another number).\n3.  **Base Case:** The recursion stops when all cells are filled.\n\n**Hint 3:**\n\n1.  `isValid()` needs to check three things:\n    * **Row Check:** Iterate through the row, checking if `num` already exists.\n    * **Column Check:** Iterate through the column, checking if `num` already exists.\n    * **Subgrid Check:** Determine the starting row and column of the 3x3 subgrid containing `board[row][col]`, and then iterate through the subgrid, checking if `num` already exists.\n2.  In the `solve()` function, iterate through the board using nested loops.  If you find a `'.'`, try numbers from 1 to 9.  If `isValid()` returns true for a number, place it (`board[row][col] = num`), recursively call `solve()`, and if it's successful (the recursion returns), you are done with that cell. If the recursion doesn't solve the board after placing a number (it returns unsuccessfully), you need to backtrack (`board[row][col] = '.'`).\n\nRemember to handle edge cases, like an empty board or a board already solved.\n",
// };

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { problemData } = useBot();

  useEffect(() => {
    if (problemData && problemData.id) {
      chrome.storage.local.get([problemData.id], (result) => {
        const existingChats = result[problemData.id] || [];
        setChats(existingChats);
      });
    } else {
      setChats([]);
    }
    // setChats([
    //   {
    //     by: "bot",
    //     message: op.output,
    //     type: "markdown",
    //   },
    // ]);
  }, [problemData]);

  if (!problemData) return null;

  return (
    <>
      {chats.map((chat, i) => (
        <ChatCard
          key={i}
          by={chat.by}
          message={chat.message}
          type={chat.type}
        />
      ))}
    </>
  );
};
export default ChatList;
