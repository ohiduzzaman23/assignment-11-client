import Carousel from "../../components/Carousel/Carousel";
import LifeLessons from "../../components/Home/LifeLessons";
import LifeMatters from "../../components/Home/LifeMatters";
import MeetOurSharers from "../../components/Home/MeetOurSharers";
import ReadyTransform from "../../components/Home/ReadyTransform";
import LessonsWorth from "../../components/LessonsWorth";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <LifeLessons />
      {/* More components */}
      <LifeMatters></LifeMatters>
      <MeetOurSharers></MeetOurSharers>
      <LessonsWorth></LessonsWorth>
      <ReadyTransform></ReadyTransform>
    </div>
  );
};

export default Home;
