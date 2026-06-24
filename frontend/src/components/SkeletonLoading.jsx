// import BackgroundColorContainer from "../components/BackgroundColorContainer.jsx";
import { LoaderIcon } from "lucide-react";
import BackgroundBoxContainer from "./BackgroundBoxContainer.jsx";

export const SignUpSkeletonLoadingPage = () => {
  return (
    <BackgroundBoxContainer>
      <div className="w-full flex flex-col md:flex-row animate-pulse">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
          <div className="w-full max-w-md">
            {/* Header text*/}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-slate-700 mb-4"></div>

              <div className="h-8 w-48 bg-slate-700 rounded mb-3"></div>

              <div className="h-4 w-40 bg-slate-800 rounded"></div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="h-4 w-24 bg-slate-600 rounded mb-2"></div>

                  <div className="relative">
                    <div className="w-full h-12 bg-slate-700 rounded-xl"></div>
                  </div>
                </div>
              ))}

              {/* Button */}
              <div className="h-12 w-full bg-slate-700 rounded-xl py-3">
                <LoaderIcon className="w-full h-6 animate-spin text-center text-slate-500" />
              </div>

              {/* Login Link */}
              <div className="h-4 w-48 bg-slate-600 rounded mx-auto mt-6"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Image Skeleton */}
            <div className="w-full h-72 bg-slate-700 rounded-3xl flex items-center justify-center">
              <LoaderIcon className="w-full h-6 animate-spin text-center text-slate-500" />
            </div>

            {/* Text */}
            <div className="h-6 w-56 bg-slate-700 rounded mt-6"></div>

            {/* Badges */}
            <div className="flex gap-4 mt-6">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-20 bg-slate-700 rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundBoxContainer>
  );
};

export const LoginSkeletonLoadingPage = () => {
  return <BackgroundBoxContainer></BackgroundBoxContainer>;
};
