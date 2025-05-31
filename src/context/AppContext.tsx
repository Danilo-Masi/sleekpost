import { useState, createContext, useContext, type Dispatch, type SetStateAction } from "react";

type AppContextType = {
    section: string;
    setSection: Dispatch<SetStateAction<string>>;
    subreddit: string;
    setSubreddit: Dispatch<SetStateAction<string>>;
    subredditError: boolean;
    setSubredditError: Dispatch<SetStateAction<boolean>>;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    titleError: boolean;
    setTitleError: Dispatch<SetStateAction<boolean>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    contentError: boolean;
    setContentError: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [section, setSection] = useState("input");
    const [subreddit, setSubreddit] = useState("");
    const [subredditError, setSubredditError] = useState(false);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState(false);

    return (
        <AppContext.Provider
            value={{
                section,
                setSection,
                subreddit,
                setSubreddit,
                subredditError,
                setSubredditError,
                title,
                setTitle,
                titleError,
                setTitleError,
                content,
                setContent,
                contentError,
                setContentError,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("CLIENT: useAppContext must be used within an AppProvider");
    }
    return context;
}