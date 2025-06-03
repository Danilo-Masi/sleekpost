import MainContainer from "@/components/custom/MainContainer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";

export default function Errorpage() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <AlertCircle className="w-16 h-16 text-red-500" />

        <h1 className="text-3xl font-bold tracking-tight text-center">
          Oops! Something went wrong
        </h1>

        <p className="text-muted-foreground text-center">
          We apologize for the inconvenience. Please try again or return to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={() => navigate("/")}>
            <ArrowLeft /> Return Home
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => window.location.reload()}>
            <RotateCcw /> Try Again
          </Button>
        </div>
      </div>
    </MainContainer>
  );
}
