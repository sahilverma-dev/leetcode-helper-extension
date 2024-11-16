import ChatCard from "./ChatCard";

const ChatList = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <ChatCard
          by={i % 2 === 0 ? "bot" : "user"}
          message={`Message ${i}`}
          type="text"
        />
      ))}
    </>
  );
};
export default ChatList;
