import type { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-auto min-h-svh flex justify-center">
            <div className="w-[90%] h-auto min-h-svh flex flex-wrap items-start justify-start">
                {children}
            </div>
        </div>
    );
}
