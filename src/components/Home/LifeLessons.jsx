import Card from "./Card";
import Container from "../Shared/Container";
import { GoArrowRight } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LessonCard from "../ExploreLessons/LessonCard";
import { Link } from "react-router-dom";
import { IoMdStarOutline } from "react-icons/io";

const LifeLessons = () => {
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessonsHome"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons?limit=4`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#EDE9E1] py-15">
      <Container>
        <div className="flex justify-between items-end">
          <div className="w-150">
            <span className="text-primary font-semibold">
              {" "}
              <IoMdStarOutline className="inline mr-1" />
              Featured
            </span>

            <h1 className="text-4xl font-semibold my-4">
              Life Lessons Worth Reading
            </h1>
            <p>
              Discover wisdom from real experiences. These lessons have inspired
              thousands and might just change your perspective.
            </p>
          </div>

          <Link
            to="/explore-lessons"
            className="btn rounded-2xl flex items-center gap-2 group"
          >
            View All Lessons
            <GoArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default LifeLessons;
