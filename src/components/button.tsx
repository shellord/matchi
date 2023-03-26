import React, { PropsWithChildren } from "react";

type TButton = {
  onClick: () => void;
};

const Button: React.FC<PropsWithChildren<TButton>> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="px-3 py-2 border-xl bg-slate-900 rounded-xl hover:bg-slate-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
