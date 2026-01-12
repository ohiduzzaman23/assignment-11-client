import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Container from "../components/Shared/Container";
import LessonCard from "../components/ExploreLessons/LessonCard";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const Favorites = () => {
  const { user } = useAuth();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: async () => {
      if (!user?._id) return [];
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user._id}/saved-lessons`
      );
      return res.data;
    },
    enabled: !!user?._id,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-[#f7f5ef] py-10">
      <Container>
        <h1 className="text-4xl font-bold mb-6">My Favorites</h1>

        {lessons.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You have no saved lessons yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
