import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { ArrowLeft, ThumbsUp, Bookmark, Share2, Flag } from "lucide-react";
import PremiumCard from "./PremiumCard";

const LessonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ---------- States ------
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // token exists
  const token = localStorage.getItem("token");
  const authHeaders = token ? { authorization: `Bearer ${token}` } : {};

  // ---------- Fetch Lesson -------
  const {
    data: lesson,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/lessons/${id}`
      );
      return res.data;
    },
    enabled: !!id,
    onSuccess: (data) => {
      // set local UI states
      setIsSaved(data.isSaved || false);
      setIsLiked(data.isLiked || false);
      setLikesCount(data.likes || 0);

      // increase view

      axios
        .post(`${import.meta.env.VITE_API_URL}/lessons/${id}/view`)
        .catch((e) => {
          console.debug("view increment failed", e?.message || e);
        });
    },
  });

  // -------- Lesson Mutations -------

  // Like lesson
  const lessonLikeMutation = useMutation({
    mutationFn: async () =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/lessons/${id}/like`,
        {},
        { headers: authHeaders }
      ),
    onMutate: () => {
      // optimistic UI update
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    },
    onError: (err) => {
      // rollback
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      console.error("Like failed:", err?.response?.data || err.message || err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
    },
  });

  // Save lesson
  const lessonSaveMutation = useMutation({
    mutationFn: async () =>
      axios.post(`${import.meta.env.VITE_API_URL}/lessons/${id}/save`),
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
      queryClient.invalidateQueries(["lessons-worth"]);
      setIsSaved((prev) => !prev);
    },
    onError: (err) => {
      console.error("Save failed:", err?.response?.data || err.message || err);
    },
  });

  const lessonShareMutation = useMutation({
    mutationFn: async () =>
      axios.post(`${import.meta.env.VITE_API_URL}/lessons/${id}/share`),
    onSuccess: () => queryClient.invalidateQueries(["lesson", id]),
  });

  const lessonReportMutation = useMutation({
    mutationFn: async (reason) =>
      axios.post(`${import.meta.env.VITE_API_URL}/lessons/${id}/report`, {
        reason,
      }),
    onSuccess: () => queryClient.invalidateQueries(["lesson", id]),
  });

  // ----- Comment Mutations -------
  const commentMutation = useMutation({
    mutationFn: async (text) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/lessons/${id}/comments`,
        { text },
        { headers: authHeaders }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
      setNewComment("");
    },
    onError: (err) => {
      console.error(
        "Post comment failed:",
        err?.response?.data || err.message || err
      );
    },
  });

  const replyMutation = useMutation({
    mutationFn: async ({ commentId, text }) =>
      axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/lessons/${id}/comments/${commentId}/replies`,
        { text },
        { headers: authHeaders }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["lesson", id]);
      setReplyText({});
    },
    onError: (err) => {
      console.error("Reply failed:", err?.response?.data || err.message || err);
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async (commentId) =>
      axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/lessons/${id}/comments/${commentId}/like`,
        {},
        { headers: authHeaders }
      ),
    onSuccess: () => queryClient.invalidateQueries(["lesson", id]),
    onError: (err) => {
      console.error(
        "Like comment failed:",
        err?.response?.data || err.message || err
      );
    },
  });

  // --- Loading / Error ------
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  if (!lesson) return <p>Lesson not found</p>;

  // ----- Conditional Premium ------
  if (lesson.premiumOnly) return <PremiumCard />;

  // ------ Render ---
  return (
    <div className="min-h-screen bg-[#f6f1e7]">
      {/* Header */}
      <div className="relative w-full h-[320px] overflow-hidden">
        <img
          src={lesson.image || "/mountain.jpg"}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#f6f1e7] to-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-gray-700 hover:bg-white transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="relative max-w-6xl mx-auto flex gap-6 px-4 pb-20 mt-[-80px] z-20">
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Tags */}
            <div className="flex gap-3 mb-3">
              {lesson.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[13px] bg-gray-100 rounded-full text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {lesson.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-4 text-gray-500 text-sm mb-6">
              <span>{new Date(lesson.createdAt).toDateString()}</span>
              <span>{lesson.views || 0} views</span>
              <span>{likesCount} likes</span>
              <span>{lesson.saves || 0} saves</span>
              <span>{lesson.shares || 0} shares</span>
            </div>

            {/* Content */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {lesson.content}
            </p>

            {/* Lesson Actions */}
            <div className="flex gap-4 mt-8">
              {/* Like */}
              <button
                onClick={() => lessonLikeMutation.mutate()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition  ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 hover:bg-[#F08B42] hover:text-white"
                }`}
              >
                <ThumbsUp size={18} /> {likesCount} {isLiked ? "Liked" : "Like"}
              </button>

              {/* Save */}
              <button
                onClick={() => lessonSaveMutation.mutate()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition  ${
                  isSaved
                    ? "bg-[#F08B42] text-white"
                    : "bg-gray-100 hover:bg-[#F08B42] hover:text-white"
                }`}
              >
                <Bookmark size={18} /> {lesson.saves || 0}{" "}
                {isSaved ? "Saved" : "Save"}
              </button>

              {/* Share */}
              <button
                onClick={() => lessonShareMutation.mutate()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#F08B42] hover:text-white transition "
              >
                <Share2 size={18} /> Share
              </button>

              {/* Report */}
              <button
                onClick={() => {
                  const reason = prompt("Why are you reporting this lesson?");
                  if (reason) lessonReportMutation.mutate(reason);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#F08B42] hover:text-white transition"
              >
                <Flag size={18} /> Report
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>

            {/* New Comment */}
            <textarea
              className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-orange-200 focus:outline-none"
              rows="3"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() => commentMutation.mutate(newComment)}
              disabled={!newComment || commentMutation.isLoading}
              className="mt-3 bg-orange-400 text-white px-5 py-2 rounded-lg hover:bg-orange-500 transition"
            >
              {commentMutation.isLoading ? "Posting..." : "Post Comment"}
            </button>

            {/* Comment List */}
            <div className="mt-6 space-y-6 max-h-[400px] overflow-auto">
              {lesson.comments?.length ? (
                lesson.comments.map((c) => (
                  <div key={c._id} className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${c.user}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{c.user}</p>
                        <p className="text-sm text-gray-500 mb-1">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">{c.text}</p>

                        {/* Like + Reply */}
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <button
                            onClick={() => likeCommentMutation.mutate(c._id)}
                            className="flex items-center gap-1"
                          >
                            👍 {c.likes || 0}
                          </button>
                          <button
                            onClick={() =>
                              setReplyText((prev) => ({
                                ...prev,
                                [c._id]: prev[c._id] || "",
                              }))
                            }
                          >
                            Reply
                          </button>
                        </div>

                        {/* Reply Box */}
                        {replyText[c._id] !== undefined && (
                          <div className="mt-2 flex flex-col gap-2">
                            <textarea
                              className="w-full border border-gray-300 rounded-xl p-2 text-gray-700 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                              rows="2"
                              placeholder="Write a reply..."
                              value={replyText[c._id]}
                              onChange={(e) =>
                                setReplyText((prev) => ({
                                  ...prev,
                                  [c._id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              onClick={() =>
                                replyMutation.mutate({
                                  commentId: c._id,
                                  text: replyText[c._id],
                                })
                              }
                              disabled={
                                !replyText[c._id] || replyMutation.isLoading
                              }
                              className="self-end bg-gray-200 px-4 py-1 rounded-lg hover:bg-gray-300"
                            >
                              {replyMutation.isLoading ? "Posting..." : "Reply"}
                            </button>
                          </div>
                        )}

                        {/* Replies */}
                        {c.replies?.length > 0 && (
                          <div className="mt-2 pl-6 flex flex-col gap-2">
                            {c.replies.map((r) => (
                              <div key={r._id} className="flex gap-3">
                                <img
                                  src={`https://i.pravatar.cc/30?u=${r.user}`}
                                  className="w-7 h-7 rounded-full"
                                />
                                <div>
                                  <p className="font-semibold text-gray-700 text-sm">
                                    {r.user}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    {r.text}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[280px] hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="font-medium text-gray-500 mb-2">Written by</p>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={lesson.authorImage || "https://i.pravatar.cc/60?img=7"}
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-700">
                  {lesson.author || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-500">
                  {lesson.authorLessonCount || 12} lessons shared
                </p>
              </div>
            </div>
            <button className="w-full bg-gray-100 p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition">
              View Profile
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800">Similar Lessons</h3>
            <p className="text-gray-500 text-sm mt-2">
              (You can add items here)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
