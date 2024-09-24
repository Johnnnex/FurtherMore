"use client";

const Button = ({
  name,
  onClick,
  disabled,
}: {
  name: string;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-[90%] text-white animate-fade-in disabled:bg-gray-300 focus:bg-[#C78609] transition-all duration-400 min-h-16 bg-[#E5980A] rounded-[1.125rem] shadow-[inset_0px_0.25rem_0.25rem_0px_rgba(255,255,255,0.25)] text-[1.125rem] font-normal leading-6"
    >
      {name || null}
    </button>
  );
};

export default Button;
