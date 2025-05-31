import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2, ScanText } from "lucide-react";
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

function ErrorLabel({ id, errorMsg, isVisible }: { id: string, errorMsg: string, isVisible: boolean }) {
    return <Label htmlFor={id} className={`text-red-500 ${isVisible ? 'flex' : 'hidden'}`}>{errorMsg}</Label>
}

function SubredditInput() {
    const { subreddit, setSubreddit, subredditError, setSubredditError } = useAppContext();
    return (
        <BlockContainer>
            <StartLabel id="label-subreddit" msg="Choose a subreddit to target" />
            <Select value={subreddit} onValueChange={setSubreddit} onOpenChange={() => setSubredditError(false)}>
                <SelectTrigger className="w-full md:w-[300px] cursor-pointer">
                    <SelectValue placeholder="Select a subreddit" />
                </SelectTrigger>
                <SelectContent id="label-subreddit">
                    {subreddits.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.placeholder}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <ErrorLabel id="label-subreddit" errorMsg="Please select a subreddit before continuing" isVisible={subredditError} />
        </BlockContainer>
    );
}

function TitleInput() {
    const { title, setTitle, titleError, setTitleError } = useAppContext();
    return (
        <BlockContainer>
            <StartLabel id="label-title" msg="Write a clear and engaging title" />
            <Textarea
                id="label-title"
                className="resize-none"
                placeholder="E.g. How I turned my side project into a profitable SaaS"
                maxLength={100}
                minLength={1}
                value={title}
                onChange={e => setTitle(e.target.value)}
                onFocus={() => setTitleError(false)} />
            <ErrorLabel id="label-title" errorMsg="The title is required to continue" isVisible={titleError} />
        </BlockContainer>
    );
}

function ContentInput() {
    const { content, setContent, contentError, setContentError } = useAppContext();
    return (
        <BlockContainer>
            <StartLabel id="label-content" msg="Tell your story or share your idea" />
            <Textarea
                id="label-content"
                className="resize-none h-[40svh] overflow-y-scroll"
                placeholder="Write or copy the full post content here…"
                maxLength={1000}
                minLength={10}
                value={content}
                onChange={e => setContent(e.target.value)}
                onFocus={() => setContentError(false)} />
            <ErrorLabel id="label-content" errorMsg="The post content is required to continue" isVisible={contentError} />
        </BlockContainer>
    );
}

function ButtonAnalyze({ handleAnalyze, isLoading }: { handleAnalyze: () => void, isLoading: boolean }) {
    return (
        <Button
            disabled={isLoading}
            className={`cursor-pointer w-full`}
            onClick={handleAnalyze}>
            {isLoading ? (<><Loader2 className="animate-spin" /> Analyzing</>) : (<><ScanText /> Analyze My Post</>)}
        </Button>
    );
}

export default function InputContainer() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setSection, subreddit, setSubredditError, title, setTitleError, content, setContentError } = useAppContext();

    const handleAnalyze = () => {
        setLoading(true);
        handleValidate();
        setLoading(false);
        setSection("result");

    }

    const handleValidate = () => {
        if (subreddit.length === 0) {
            setSubredditError(true);
        }
        if (title.length === 0) {
            setTitleError(true);
        }
        if (content.length <= 0) {
            setContentError(true);
        }
    }

    return (
        <div className="w-full md:w-3/5 h-auto md:h-[85svh] overflow-scroll p-0 md:px-5 py-5 md:pt-0 flex flex-wrap items-start justify-start gap-6">
            <SubredditInput />
            <TitleInput />
            <ContentInput />
            <ButtonAnalyze handleAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>
    );
}
