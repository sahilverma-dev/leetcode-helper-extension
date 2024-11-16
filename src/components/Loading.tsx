import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};
export default Loading;
