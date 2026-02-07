import React from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
};

const FormButton = ({ children, disabled = false }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`px-4 py-2 rounded
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default FormButton;