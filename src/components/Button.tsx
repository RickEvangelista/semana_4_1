import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "danger"
	className?: string;
}

function Button({ children, variant = "primary", disabled, className, ...props }: ButtonProps) {
	
	const base = `rounded-md font-semibold ${disabled ? 'opacity-50 cursor-not-allowed' : "hover:brightness-70 transition"}`;
	
	const buttonClass = clsx(
		base,
		{
			"bg-custom-blue text-white p-3": variant === "primary",
			"bg-white text-custom-blue border-custom-blue border-4 p-2": variant === "secondary",
			"bg-custom-pink text-white p-3": variant === "danger",
		},
		className
	)

	return (
		<button className={buttonClass} {...props} disabled={disabled}>
			{children}
		</button>
	);

}

export default Button;
