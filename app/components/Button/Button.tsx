"use client";

const Button = ({
  name,
  onClick,
  disabled,
  variant,
}: {
  name: string;
  variant?: "outlined" | "contained";
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[90%] animate-fade-in disabled:bg-gray-300 ${
        variant === "outlined"
          ? "text-[#E5980A] border border-[#E5980A]"
          : "text-white focus:bg-[#C78609] bg-[#E5980A] shadow-[inset_0px_0.25rem_0.25rem_0px_rgba(255,255,255,0.25)]"
      }  transition-all duration-400 min-h-16 rounded-[1.125rem] text-[1.125rem] font-normal leading-6`}
    >
      {name || null}
    </button>
  );
};

export default Button;
