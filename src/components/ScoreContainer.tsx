import { Label } from "@radix-ui/react-label";
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Pencil } from "lucide-react";
import { useAppContext } from "@/context/AppContext";


function AnalysesContainer({ children, width, height }: { children: ReactNode, width?: string, height?: string }) {
    return (
        <div className={`w-full p-5 rounded-lg flex flex-wrap border border-gray-200 inset-0 ${width} ${height}`}>
            {children}
        </div>
    );
}

function StartLabel({ id, msg }: { id: string, msg: string }) {
    return <Label htmlFor={id} className="text-md font-semibold mb-6">{msg}</Label>
}

function ScoreAnalyses() {
    return (
        <AnalysesContainer width="md:w-[calc(30%-0.75rem)]" height="md:h-[30svh]">
            <StartLabel id="overall-score" msg="Overall Score" />
            <h1 className="font-bold text-5xl w-full flex items-start justify-center">55%</h1>
        </AnalysesContainer>
    );
}

function ProgressAnalyses() {
    return (
        <AnalysesContainer width="md:w-[calc(70%-0.75rem)]" height="md:h-[30svh]">
            <StartLabel id="progress-bar" msg="How strong is your post?" />
            <div className="w-full flex flex-col items-start justify-center gap-6" id="progress-bar">
                <Progress value={55} />
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </AnalysesContainer>
    )
}

function TitleAnalyses() {
    return (
        <AnalysesContainer height="md:h-[30svh]">
            <StartLabel id="title-feedback" msg="Title feedback" />
        </AnalysesContainer>
    );
}

function ContentAnalyses() {
    return (
        <AnalysesContainer height="md:h-[30svh]">
            <StartLabel id="content-feedback" msg="Post content feedback" />
        </AnalysesContainer>
    );
}

function Buttons() {
    const { setSection } = useAppContext();
    return (
        <div className="w-full h-fit rounded-lg flex flex-col gap-6">
            <Button
                className="cursor-pointer"
                onClick={() => setSection("input")}>
                <ArrowLeft /> Go back and edit your post
            </Button>
            <Button
                className="bg-orange-600 hover:bg-orange-600/90 cursor-pointer"
                onClick={() => window.location.href = "https://www.postonreddit.com/?ref=sleekpost"}>
                <Pencil /> Your post is ready, publish it on Reddit now
            </Button>
        </div>
    );
}

export default function ScoreContainer() {
    return (
        <div className="w-full md:w-3/5 h-auto md:h-[85svh] overflow-scroll p-0 md:px-5 py-5 md:pt-0 flex flex-wrap items-start justify-start gap-6">
            <ScoreAnalyses />
            <ProgressAnalyses />
            <TitleAnalyses />
            <ContentAnalyses />
            <Buttons />
        </div>
    );
}
