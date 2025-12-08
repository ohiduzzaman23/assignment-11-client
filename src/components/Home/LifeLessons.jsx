import Card from "./Card";
import Container from "../Shared/Container";
import { GoArrowRight } from "react-icons/go";

const LifeLessons = () => {
  return (
    <div className="bg-[#EDE9E1] py-15 ">
      <Container>
        <div>
          <div className="flex justify-between items-end">
            <div className="w-150">
              <span>Featured</span>
              <h1 className="text-4xl font-semibold my-4">
                Life Lessons Worth Reading
              </h1>
              <p>
                Discover wisdom from real experiences. These lessons have
                inspired thousands and might just change your perspective.
              </p>
            </div>
            <div>
              <button className="btn rounded-2xl flex items-center gap-2 group ">
                View All Lessons
                <GoArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </div>
  );
};

export default LifeLessons;
