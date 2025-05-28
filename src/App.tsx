import BannerAds from "./components/BannerAds";
import BannerCriteria from "./components/BannerCriteria";
import MainContainer from "./components/custom/MainContainer";
import Navbar from "./components/Navbar";
import InputContainer from "./components/InputContainer";
import ScoreContainer from "./components/ScoreContainer";

export default function App() {
  return (
    <MainContainer>
      <Navbar />
      <BannerCriteria />
      <ScoreContainer />
      <BannerAds />
    </MainContainer>
  );
}
