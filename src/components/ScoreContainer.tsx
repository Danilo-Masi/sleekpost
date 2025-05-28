import { Label } from "@radix-ui/react-label";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

function AnalysesContainer({ children, width }: { children: ReactNode, width?: string }) {
    return (
        <div className={`w-full h-1/3 p-5 rounded-lg flex flex-wrap border border-gray-200 inset-0 ${width}`}>
            {children}
        </div>
    );
}

function StartLabel({ id, msg }: { id: string, msg: string }) {
    return <Label htmlFor={id} className="text-md font-semibold">{msg}</Label>
}

function ScoreAnalyses() {
    return (
        <AnalysesContainer>
            score
        </AnalysesContainer>
    );
}

function TitleAnalyses() {
    return (
        <AnalysesContainer width="md:w-[calc(50%-0.75rem)]">
            <StartLabel id="title-analyses" msg="Title analyses" />
        </AnalysesContainer>
    );
}

function ContentAnalyses() {
    return (
        <AnalysesContainer width="md:w-[calc(50%-0.75rem)]">
            <StartLabel id="content-analyses" msg="Content analyses" />
        </AnalysesContainer>
    );
}

function Buttons() {
    return (
        <div className="w-full h-1/3 rounded-lg flex flex-wrap">
            <Button>ciao</Button>
            <Button>ciao</Button>
            <Button>ciao</Button>
        </div>
    );
}


export default function ScoreContainer() {
    return (
        <div className="w-full md:w-3/5 h-[90svh] overflow-scroll p-0 md:px-5 py-5 flex flex-wrap items-start justify-start gap-6">
            <ScoreAnalyses />
            <TitleAnalyses />
            <ContentAnalyses />
            <Buttons />
        </div>
    );
}
