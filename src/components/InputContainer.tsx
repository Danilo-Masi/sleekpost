import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, type ReactNode, useCallback } from "react";
import { Button } from "./ui/button";
import { Loader2, ScanText, Copy, Check } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { analyzePost } from "@/analysis/analyzePost";

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
                <SelectTrigger className="w-full md:w-[300px] cursor-pointer border focus:ring-1 focus:ring-orange-400 focus:border-orange-400 data-[state=open]:ring-1 data-[state=open]:ring-orange-400 data-[state=open]:border-orange-400">
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
    const [isCopied, setCopied] = useState<boolean>(false);
    const [isCopying, setIsCopying] = useState<boolean>(false);

    const handleCopy = useCallback(async () => {
        if (!title || isCopying) return;
        try {
            setIsCopying(true);
            await navigator.clipboard.writeText(title);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy text:', err);
        } finally {
            setIsCopying(false);
        }
    }, [title, isCopying]);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <BlockContainer>
            <StartLabel id="label-title" msg="Write a clear and engaging title" />
            <div className="relative">
                <Textarea
                    id="label-title"
                    className="resize-none focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400 pr-10"
                    placeholder="E.g. How I turned my side project into a profitable SaaS"
                    maxLength={100}
                    minLength={1}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onFocus={() => setTitleError(false)} />
                {title && (
                    <button
                        onClick={handleCopy}
                        disabled={isCopying}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors cursor-pointer ${isCopied ? 'hover:bg-green-100' : 'hover:bg-zinc-100'} ${isCopying && 'opacity-50 cursor-not-allowed'}`}
                        title={isCopying ? "Copying..." : "Copy to clipboard"}>
                        {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-zinc-600" />}
                    </button>
                )}
            </div>
            <ErrorLabel id="label-title" errorMsg="The title is required to continue" isVisible={titleError} />
        </BlockContainer>
    );
}

function ContentInput() {
    const { content, setContent, contentError, setContentError } = useAppContext();
    const [isCopied, setCopied] = useState<boolean>(false);
    const [isCopying, setIsCopying] = useState<boolean>(false);

    const handleCopy = useCallback(async () => {
        if (!content || isCopying) return;
        try {
            setIsCopying(true);
            await navigator.clipboard.writeText(content);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy text:', err);
        } finally {
            setIsCopying(false);
        }
    }, [content, isCopying]);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <BlockContainer>
            <StartLabel id="label-content" msg="Tell your story or share your idea" />
            <div className="relative">
                <Textarea
                    id="label-content"
                    className="resize-none h-[40svh] overflow-y-scroll focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400"
                    placeholder="Write or copy the full post content here…"
                    minLength={10}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onFocus={() => setContentError(false)} />
                {content && (
                    <button
                        onClick={handleCopy}
                        disabled={isCopying}
                        className={`absolute right-2 bottom-0 -translate-y-1/2 p-2 rounded-md transition-colors cursor-pointer ${isCopied ? 'hover:bg-green-100' : 'hover:bg-zinc-100'} ${isCopying && 'opacity-50 cursor-not-allowed'}`}
                        title={isCopying ? "Copying..." : "Copy to clipboard"}>
                        {isCopied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-zinc-600" />}
                    </button>
                )}
            </div>
            <ErrorLabel id="label-content" errorMsg="The post content is required to continue" isVisible={contentError} />
        </BlockContainer>
    );
}

function ButtonAnalyze({ handleAnalyze, isLoading }: { handleAnalyze: () => void, isLoading: boolean }) {
    return (
        <Button
            disabled={isLoading}
            className="cursor-pointer w-full py-5"
            onClick={handleAnalyze}>
            {isLoading ? (<><Loader2 className="animate-spin" /> Analyzing</>) : (<><ScanText /> Analyze My Post</>)}
        </Button>
    );
}

export default function InputContainer() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setSection, subreddit, setSubredditError, title, setTitleError, content, setContentError, setAnalysisResult } = useAppContext();

    const handleValidate = () => {
        let isValid = true;

        if (!subreddit || subreddit.trim().length === 0) {
            setSubredditError(true);
            isValid = false;
        } else {
            setSubredditError(false);
        }

        if (!title || title.trim().length === 0) {
            setTitleError(true);
            isValid = false;
        } else {
            setTitleError(false);
        }

        if (!content || content.trim().length === 0) {
            setContentError(true);
            isValid = false;
        } else {
            setContentError(false);
        }

        return isValid;
    };

    const handleAnalyze = () => {
        setLoading(true);
        const isValid = handleValidate();

        if (!isValid) {
            setLoading(false);
            return;
        }

        const result = analyzePost({ title, content, subreddit: subreddit.toLowerCase() });
        setAnalysisResult(result);

        setLoading(false);
        setSection("result");
    };

    return (
        <div className="w-full md:w-3/5 h-auto md:h-[85svh] overflow-scroll p-0 md:px-5 py-5 md:pt-0 flex flex-wrap items-start justify-start gap-6">
            <SubredditInput />
            <TitleInput />
            <ContentInput />
            <ButtonAnalyze handleAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>
    );
}
