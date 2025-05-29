import type { ReactNode } from "react";

export default function BannerContainer({ children, hidden }: { children: ReactNode, hidden: boolean }) {
    return (
        <div className={`w-full md:w-1/5 h-auto md:h-[85svh] mb-5 md:mb-0 p-5 flex-col items-start justify-start gap-6 overflow-scroll bg-zinc-100 rounded-lg ${hidden ? "md:flex hidden" : "flex"}`}>
            {children}
        </div>
    );
}
