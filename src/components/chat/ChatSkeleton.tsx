const ChatSkeleton = () => {
  return (
    <div className="animate-pulse flex items-start gap-3 w-[80%] p-4 rounded-lg bg-secondary">
      <div className="w-10 h-10 bg-muted rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
