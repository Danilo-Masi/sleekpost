import BannerAds from "@/components/BannerAds";
import BannerCriteria from "@/components/BannerCriteria";
import MainContainer from "@/components/custom/MainContainer";
import InputContainer from "@/components/InputContainer";
import Navbar from "@/components/Navbar";
import ScoreContainer from "@/components/ScoreContainer";
import { useAppContext } from "@/context/AppContext";

export default function Homepage() {
    const { section } = useAppContext();

    const handleComponent = () => {
        if (section.includes("result")) {
            return <ScoreContainer />
        } else {
            return <InputContainer />
        }
    }

    return (
        <MainContainer>
            <Navbar />
            <BannerCriteria />
            {handleComponent()}
            <BannerAds />
        </MainContainer>
    );
}
