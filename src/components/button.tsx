import React, { PropsWithChildren } from "react";

const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className="px-3 py-2 border-xl bg-slate-900 rounded-xl hover:bg-slate-800">
      {children}
    </button>
  );
};

export default Button;
