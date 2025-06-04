import { memo, useMemo } from "react";
import BannerAds from "@/components/BannerAds";
import BannerCriteria from "@/components/BannerCriteria";
import MainContainer from "@/components/custom/MainContainer";
import InputContainer from "@/components/InputContainer";
import Navbar from "@/components/Navbar";
import ScoreContainer from "@/components/ScoreContainer";
import { useAppContext } from "@/context/AppContext";

const Homepage = memo(function Homepage() {
    const { section } = useAppContext();

    const MainContent = useMemo(() => {
        return section.includes("result") ? <ScoreContainer /> : <InputContainer />;
    }, [section]);

    return (
        <MainContainer>
            <Navbar />
            <BannerCriteria />
            {MainContent}
            <BannerAds />
        </MainContainer>
    );
});

export default Homepage;
