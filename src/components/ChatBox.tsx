import Header from "./header";
import ChatList from "./chat/ChatList";
import ProblemInfo from "./ProblemInfo";
import ChatForm from "./ChatForm";
import { ScrollArea } from "./ui/scroll-area";

const ChatBox = () => {
  return (
    <div className="w-full h-dvh flex flex-col gap-2 p-2">
      <div className="border rounded-lg flex-grow">
        <Header />
        <ScrollArea
          className="p-2 text-sm flex flex-col items-center gap-2"
          style={{
            height: "calc( 100vh - 115px)",
          }}
        >
          <ProblemInfo />
          <ChatList />
        </ScrollArea>
      </div>
      <ChatForm />
    </div>
  );
};
export default ChatBox;
