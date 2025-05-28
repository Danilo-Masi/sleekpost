import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const subreddits = [
    { value: "SaaS", placeholder: "r/SaaS" },
    { value: "Entrepreneur", placeholder: "r/Entrepreneur" },
    { value: "EntrepreneurRideAlong", placeholder: "r/EntrepreneurRideAlong" },
    { value: "SideProject", placeholder: "r/SideProject" },
    { value: "other", placeholder: "Other" },
];

function BlockContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-auto flex flex-col gap-3">
            {children}
        </div>
    );
}

function StartLabel({ id, msg }: { id: string, msg: string }) {
    return <Label htmlFor={id}>{msg}</Label>
}

function ErrorLabel({ id, errorMsg }: { id: string, errorMsg: string }) {
    return <Label htmlFor={id} className={`text-red-500 hidden`}>{errorMsg}</Label>
}

function SubredditInput() {
    return (
        <BlockContainer>
            <StartLabel id="label-subreddit" msg="Select the subreddit that you want to publish" />
            <Select>
                <SelectTrigger className="w-[300px] cursor-pointer">
                    <SelectValue placeholder="r/subreddit" />
                </SelectTrigger>
                <SelectContent id="label-subreddit">
                    {subreddits.map(item => (
                        <SelectItem value={item.value}>{item.placeholder}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <ErrorLabel id="label-subreddit" errorMsg="Select one of this before procede" />
        </BlockContainer>
    );
}

function TitleInput() {
    return (
        <BlockContainer>
            <StartLabel id="label-title" msg="Insert the post title" />
            <Textarea id="label-title" className="resize-none" placeholder="The best story of my life..." maxLength={100} minLength={1} />
            <ErrorLabel id="label-title" errorMsg="Insert the title before procede" />
        </BlockContainer>
    );
}

function ContentInput() {
    return (
        <BlockContainer>
            <StartLabel id="label-content" msg="Insert the post content" />
            <Textarea id="label-content" className="resize-none h-[40svh] overflow-y-scroll" placeholder="My story begin..." maxLength={1000} minLength={10} />
            <ErrorLabel id="label-content" errorMsg="Insert the post content before procede" />
        </BlockContainer>
    );
}

function ButtonAnalyze() {
    return (
        <Button className="cursor-pointer">
            Analyze the post <Check />
        </Button>
    );
}

export default function InputContainer() {
    return (
        <div className="w-full md:w-3/5 h-[90svh] overflow-scroll p-5 flex flex-col gap-6">
            <SubredditInput />
            <TitleInput />
            <ContentInput />
            <ButtonAnalyze />
        </div>
    );
}
