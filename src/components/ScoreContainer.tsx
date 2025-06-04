import { Label } from "@radix-ui/react-label";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress"
import { MousePointerClick, Undo2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function AnalysesContainer({ children, width, height }: { children: ReactNode, width?: string, height?: string }) {
    return (
        <div className={`w-full p-5 rounded-lg flex flex-wrap border border-gray-200 inset-0 ${width} ${height}`}>
            {children}
        </div>
    );
}

function StartLabel({ id, msg }: { id: string, msg: string }) {
    return <Label htmlFor={id} className="text-md font-semibold mb-6 md:mb-3">{msg}</Label>
}

function ScoreAnalyses() {
    const { analysisResult } = useAppContext();
    const renderizeColor = () => {
        if (analysisResult?.score && analysisResult.score >= 80) {
            return "text-green-500";
        } else if (analysisResult?.score && analysisResult.score >= 50) {
            return "text-yellow-500";
        } else {
            return "text-red-500";
        }
    }
    return (
        <AnalysesContainer width="md:w-[calc(30%-0.75rem)]" height="md:h-[30svh]">
            <StartLabel id="overall-score" msg="Overall Score" />
            <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
                <h1 className={`font-bold text-6xl ${renderizeColor()}`}>{analysisResult?.score}%</h1>
                <p className="text-sm text-gray-500">Based on Reddit best practices</p>
            </div>
        </AnalysesContainer>
    );
}

function ProgressAnalyses() {
    const { analysisResult } = useAppContext();
    const [text, setText] = useState("");

    const goodMessages = [
        "You're almost there!",
        "Solid post, just a few tweaks away!",
        "Great job! This could really work.",
        "Your title stands out well.",
        "Nice! This looks strong.",
        "Looks like a winner!",
        "You're close to a great post!",
        "Impressive! Just a bit more polish.",
        "Strong structure overall!",
        "Almost Reddit ready!"
    ];

    const averageMessages = [
        "Not bad, but there's room to grow.",
        "You're halfway there, keep pushing.",
        "Getting better, stay focused.",
        "Some parts work, others need more thought.",
        "It’s shaping up, but still rough.",
        "You’ve got potential, refine it!",
        "You're building something good.",
        "A solid draft. Let’s sharpen it.",
        "Okay start, let’s make it pop.",
        "Progress is progress, keep going!"
    ];

    const badMessages = [
        "This needs a stronger hook.",
        "Still rough, try again with focus.",
        "Keep going, it’s not there yet.",
        "Right now it’s too generic.",
        "Let’s rethink the message.",
        "You can do better, go deeper.",
        "Not clear enough yet.",
        "Let’s make it more engaging.",
        "This needs more punch.",
        "You’re just getting started."
    ];

    const getRandomMessage = (score: number): string => {
        if (score >= 80) {
            return goodMessages[Math.floor(Math.random() * goodMessages.length)];
        } else if (score >= 50) {
            return averageMessages[Math.floor(Math.random() * averageMessages.length)];
        } else {
            return badMessages[Math.floor(Math.random() * badMessages.length)];
        }
    };

    useEffect(() => {
        if (analysisResult?.score !== undefined) {
            const msg = getRandomMessage(analysisResult.score);
            setText(msg);
        }
    }, [analysisResult?.score]);

    const renderizeColor = () => {
        if (analysisResult?.score && analysisResult.score >= 80) {
            return "bg-green-100 [&>div]:bg-green-600";
        } else if (analysisResult?.score && analysisResult.score >= 50) {
            return "bg-yellow-100 [&>div]:bg-yellow-600";
        } else {
            return "bg-red-100 [&>div]:bg-red-600";
        }
    }

    return (
        <AnalysesContainer width="md:w-[calc(70%-0.75rem)]" height="md:h-[30svh]">
            <StartLabel id="progress-bar" msg="Post Strength Analysis" />
            <div className="w-full h-fit flex flex-col items-start justify-center gap-6 ">
                <Progress
                    value={analysisResult?.score || 0}
                    className={renderizeColor()} />
                <p className="text-sm text-gray-800">{text}</p>
            </div>
        </AnalysesContainer>
    );
}

function TitleAnalyses() {
    const { analysisResult } = useAppContext();
    return (
        <AnalysesContainer>
            <StartLabel id="title-feedback" msg="Title Optimization Tips" />
            <ul className="w-full flex flex-col gap-3 list-disc list-inside text-sm text-gray-700" id="title-feedback">
                {analysisResult?.titleSuggestions.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                ))}
            </ul>
        </AnalysesContainer>
    );
}

function ContentAnalyses() {
    const { analysisResult } = useAppContext();
    return (
        <AnalysesContainer>
            <StartLabel id="content-feedback" msg="Content Enhancement Suggestions" />
            <ul className="w-full flex flex-col gap-3 list-disc list-inside text-sm text-gray-700" id="content-feedback">
                {analysisResult?.contentSuggestions.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                ))}
            </ul>
        </AnalysesContainer>
    );
}

function Buttons() {
    const { setSection } = useAppContext();
    const handlePublish = () => {
        const url = "https://www.postonreddit.com/?ref=sleekpost_publish";
        window.open(url, "_blank", "noopener,noreferrer");
    };
    return (
        <div className="w-full h-fit rounded-lg flex flex-col gap-4">
            <Button
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSection("input")}>
                <Undo2 /> Edit Your Post
            </Button>
            <Button
                className="bg-orange-600 hover:bg-orange-600/90 cursor-pointer"
                onClick={handlePublish}>
                <MousePointerClick /> Publish on Reddit
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
