import type { ReactNode } from "react";

export default function BannerContainer({ children, hidden }: { children: ReactNode, hidden?: string }) {
    return (
        <div className={`w-full md:w-1/5 h-[90svh] p-5 md:flex flex-col items-center justify-start bg-amber-500 ${hidden}`}>
            {children}
        </div>
    );
}
