// import BackgroundColorContainer from "../components/BackgroundColorContainer.jsx";
// import { LoaderIcon } from "lucide-react";
// import BackgroundBoxContainer from "./BackgroundBoxContainer.jsx";

export const SignUpSkeletonLoadingPage = () => {
  return (
    // <BackgroundBoxContainer>
    <div className="w-full flex flex-col md:flex-row animate-pulse">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-slate-700 mx-auto mb-4"></div>

            {/* Heading */}
            <div className="h-8 w-52 bg-slate-700 rounded mx-auto mb-3"></div>

            {/* Subheading */}
            <div className="h-4 w-40 bg-slate-800 rounded mx-auto"></div>

            {/* Form */}
            <div className="space-y-6 mt-8">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="h-4 w-20 bg-slate-700 rounded mb-2"></div>

                  <div className="h-12 w-full bg-slate-800 rounded-xl"></div>
                </div>
              ))}

              {/* Button */}
              <div className="h-12 w-full bg-slate-700 rounded-xl"></div>
            </div>

            {/* Link */}
            <div className="h-4 w-44 bg-slate-800 rounded mx-auto mt-6"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:w-1/2 md:flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Image Placeholder */}
          <div className="aspect-square bg-slate-800 rounded-3xl"></div>

          {/* Text */}
          <div className="mt-6 text-center">
            <div className="h-7 w-64 bg-slate-700 rounded mx-auto mb-4"></div>

            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-8 w-20 bg-slate-800 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </BackgroundBoxContainer>
  );
};

export const LoginSkeletonLoadingPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row animate-pulse">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-slate-700 mx-auto mb-4"></div>

            {/* Heading */}
            <div className="h-8 w-52 bg-slate-700 rounded mx-auto mb-3"></div>

            {/* Subheading */}
            <div className="h-4 w-40 bg-slate-800 rounded mx-auto"></div>

            {/* Form */}
            <div className="space-y-6 mt-8">
              {[1, 2].map((item) => (
                <div key={item}>
                  <div className="h-4 w-20 bg-slate-700 rounded mb-2"></div>

                  <div className="h-12 w-full bg-slate-800 rounded-xl"></div>
                </div>
              ))}

              {/* Button */}
              <div className="h-12 w-full bg-slate-700 rounded-xl"></div>
            </div>

            {/* Link */}
            <div className="h-4 w-44 bg-slate-800 rounded mx-auto mt-6"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:w-1/2 md:flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Image Placeholder */}
          <div className="aspect-square bg-slate-800 rounded-3xl"></div>

          {/* Text */}
          <div className="mt-6 text-center">
            <div className="h-7 w-64 bg-slate-700 rounded mx-auto mb-4"></div>

            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-8 w-20 bg-slate-800 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
