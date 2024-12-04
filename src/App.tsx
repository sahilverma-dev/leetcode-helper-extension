import SelectModelForm from "./components/forms/SelectModelForm";
import ThemeToggle from "./components/ThemeToggle";

const Popup: React.FC = () => {
  return (
    <div className="relative p-4 w-[350px] h-[500px] flex flex-col items-center justify-center bg-background">
      <ThemeToggle className="absolute top-4 right-4 rounded-full aspect-square" />
      <div className="w-full h-20 overflow-hidden ">
        <img className="mx-auto h-20 w-auto" src={"/icons/icon128.png"} />
      </div>
      <div className="text-center my-2 w-full">
        <h1 className=" font-bold text-3xl">
          LeetCode <span className="text-yellow-500">Helper Bot</span>
        </h1>
        {/* <p className="text-sm text-muted-foreground">
          
        </p> */}
      </div>
      <SelectModelForm />
    </div>
  );
};

export default Popup;
