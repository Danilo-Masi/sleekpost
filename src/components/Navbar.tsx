import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <div className="w-full h-[10svh] flex items-center justify-between bg-blue-500">
            <h1>Logo</h1>
            <Button>Analyze the post</Button>
        </div>
    );
}
