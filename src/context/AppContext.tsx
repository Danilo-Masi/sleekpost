import { useState, createContext, useContext, type Dispatch, type SetStateAction } from "react";

type AppContextType = {
    section: string;
    setSection: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [section, setSection] = useState("input");

    return (
        <AppContext.Provider
            value={{ section, setSection }}>
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