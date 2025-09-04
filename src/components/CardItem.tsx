import React, { ReactNode } from "react";

interface CardItemProps {
    title: string;
    content?: ReactNode;
    borderColor?: string;
    actions?: ReactNode;
    className?: string;
}

function CardItem({ title, content, actions, borderColor, className = "" }: CardItemProps) {
    return (
        <div
            className={`bg-white rounded-md shadow-md hover:shadow-xl p-6 transition-shadow border-t-4 flex flex-col justify-between ${borderColor} ${className}`}
        >
            <h3 className="text-xl font-semibold text-custom-dark-gray mb-2">
                {title}
            </h3>
            <div className="flex-1">{content}</div>
            {actions && <div className="mt-4 text-right">{actions}</div>}
        </div>
    );
}

export default CardItem;
