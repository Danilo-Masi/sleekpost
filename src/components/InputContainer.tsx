import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Check, ScanText } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const subreddits = [
    { value: "SaaS", placeholder: "r/SaaS" },
    { value: "Entrepreneur", placeholder: "r/Entrepreneur" },
    { value: "EntrepreneurRideAlong", placeholder: "r/EntrepreneurRideAlong" },
    { value: "SideProject", placeholder: "r/SideProject" },
    { value: "other", placeholder: "Other" },
];

function BlockContainer({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-fit flex flex-col gap-3">
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
            <StartLabel id="label-subreddit" msg="Choose a subreddit to target" />
            <Select>
                <SelectTrigger className="w-full md:w-[300px] cursor-pointer">
                    <SelectValue placeholder="Select a subreddit" />
                </SelectTrigger>
                <SelectContent id="label-subreddit">
                    {subreddits.map(item => (
                        <SelectItem value={item.value}>{item.placeholder}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <ErrorLabel id="label-subreddit" errorMsg="Please select a subreddit before continuing" />
        </BlockContainer>
    );
}

function TitleInput() {
    return (
        <BlockContainer>
            <StartLabel id="label-title" msg="Write a clear and engaging title" />
            <Textarea id="label-title" className="resize-none" placeholder="E.g. How I turned my side project into a profitable SaaS" maxLength={100} minLength={1} />
            <ErrorLabel id="label-title" errorMsg="The title is required to continue" />
        </BlockContainer>
    );
}

function ContentInput() {
    return (
        <BlockContainer>
            <StartLabel id="label-content" msg="Tell your story or share your idea" />
            <Textarea id="label-content" className="resize-none h-[40svh] overflow-y-scroll" placeholder="Write or copy the full post content here…" maxLength={1000} minLength={10} />
            <ErrorLabel id="label-content" errorMsg="The post content is required to continue" />
        </BlockContainer>
    );
}

function ButtonAnalyze() {

    const { setSection } = useAppContext();

    return (
        <Button
            className="cursor-pointer w-full"
            onClick={() => setSection("result")}>
            <ScanText /> Analyze My Post
        </Button>
    );
}

export default function InputContainer() {
    return (
        <div className="w-full md:w-3/5 h-auto md:h-[85svh] overflow-scroll p-0 md:px-5 py-5 md:pt-0 flex flex-wrap items-start justify-start gap-6">
            <SubredditInput />
            <TitleInput />
            <ContentInput />
            <ButtonAnalyze />
        </div>
    );
}
