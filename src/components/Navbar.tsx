import { ScanText } from "lucide-react";
import { Button } from "./ui/button";
import icon from '../assets/icon.png';
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {

    const { setSection } = useAppContext();

    const handleClean = () => {
        setSection("input");
    }

    return (
        <div className="w-full h-[10svh] flex items-center justify-between">
            <h1 className="font-bold text-xl flex items-center justify-center gap-2"><span><img src={icon} alt="sleekpost logo" className="w-8 h-8" /></span>SleekPost</h1>
            <Button
                className="bg-orange-600 hover:bg-orange-600/90 cursor-pointer"
                onClick={handleClean}>
                <ScanText /> Analyze New Post
            </Button>
        </div>
    );
}
