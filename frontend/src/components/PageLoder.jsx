import BackgroundColorContainer from "../components/BackgroundColorContainer.jsx";
import { Loader } from "lucide-react";

const PageLoder = () => {
  return (
    <BackgroundColorContainer>
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    </BackgroundColorContainer>
  );
};

export default PageLoder;
