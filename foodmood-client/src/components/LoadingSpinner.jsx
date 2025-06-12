import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div
        className="flex w-52 flex-col gap-4 bg-white
      "
      >
        <div className="skeleton h-32 w-full bg-slate-200"></div>
        <div className="skeleton h-4 w-28 bg-slate-200"></div>
        <div className="skeleton h-4 w-full bg-slate-200"></div>
        <div className="skeleton h-4 w-full bg-slate-200"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
