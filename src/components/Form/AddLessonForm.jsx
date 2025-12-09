import { Upload, Globe, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";

const AddLessonForm = () => {
  const contributor = useAuth();
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/lessons`, payload),
    onSuccess: () => {
      toast.success("Lesson Added Successfully");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setValue("coverImage", file, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const {
      title,
      description,
      content,
      category,
      tone,
      coverImage,
      publicLesson,
      premiumOnly,
    } = data;

    let imageUrl = "";

    if (coverImage && typeof coverImage !== "string") {
      imageUrl = await imageUpload(coverImage);
    } else if (typeof coverImage === "string") {
      imageUrl = coverImage;
    }

    const lessonData = {
      title,
      description,
      content,
      category,
      tone,
      image: imageUrl,
      publicLesson: !!publicLesson,
      premiumOnly: !!premiumOnly,
      user: contributor?.user?.email,
      displayName: contributor?.user?.displayName || "Anonymous",
      avatar: contributor?.user?.photoURL || "/images/default.jpg",
    };

    await mutateAsync(lessonData);
    reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen w-full bg-[#F7F6F2] p-6 flex justify-center">
      <div className="w-full max-w-4xl rounded-2xl p-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create a Life Lesson
          </h1>
          <p className="text-gray-500 mt-1">
            Share your wisdom and inspire others with your experiences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information */}
          <div className="space-y-4 p-6 rounded-xl bg-[#F7F6F2] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-semibold text-gray-800">
              Basic Information
            </h2>

            {/* Title */}
            <div className="space-y-1">
              <label className="font-medium text-gray-700">Title *</label>
              <input
                type="text"
                placeholder="What's the core message of your lesson?"
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring focus:ring-yellow-300 outline-none "
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 80,
                    message: "Title cannot be too long",
                  },
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-1">
              <label className="font-medium text-gray-700">
                Short Description *
              </label>
              <textarea
                placeholder="Briefly describe what readers will learn..."
                className="w-full border border-gray-300 rounded-lg p-3 h-24 bg-white focus:ring focus:ring-yellow-300 outline-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>

            {/* Full Content */}
            <div className="space-y-1">
              <label className="font-medium text-gray-700">
                Full Content *
              </label>
              <textarea
                placeholder="Share your story and the lesson you learned..."
                className="w-full border border-gray-300 rounded-lg p-3 h-40 bg-white focus:ring focus:ring-yellow-300 outline-none"
                {...register("content", {
                  required: "Content is required",
                })}
              />
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4 p-6 rounded-xl bg-[#F7F6F2] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-semibold text-gray-800">
              Classification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="font-medium text-gray-700">Category *</label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring focus:ring-yellow-300 outline-none"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select a category</option>
                  <option>Personal Growth</option>
                  <option>Relationships</option>
                  <option>Career & Work</option>
                  <option>Health & Wellness</option>
                  <option>Finance & Money</option>
                  <option>Mindfulness</option>
                  <option>Creativity</option>
                  <option>Resilience</option>
                  <option>Leadership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700">
                  Emotional Tone *
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring focus:ring-yellow-300 outline-none"
                  {...register("tone", {
                    required: "Emotional tone is required",
                  })}
                >
                  <option value="">Select a tone</option>
                  <option>Inspiring</option>
                  <option>Reflective</option>
                  <option>Hopeful</option>
                  <option>Grateful</option>
                  <option>Empowering</option>
                  <option>Peaceful</option>
                  <option>Motivating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-4 p-6 rounded-xl bg-[#F7F6F2] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-semibold text-gray-800">Cover Image</h2>

            <div className="flex items-center gap-3">
              {/* Text input */}
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="flex-1 border border-gray-300 rounded-lg p-3 bg-white focus:ring focus:ring-yellow-300 outline-none"
                {...register("coverImage")}
              />

              {/* Hidden file input */}
              <input
                type="file"
                {...register("coverImage")}
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />

              {/* Button file input */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-5 py-3 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 flex items-center gap-2"
              >
                <Upload size={18} /> Upload
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Add a compelling image that represents your lesson
            </p>
          </div>

          {/* Visibility */}
          <div className="space-y-4 p-6 rounded-xl bg-[#F7F6F2] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-semibold text-gray-800">
              Visibility Settings
            </h2>

            <div className="space-y-3">
              {/* Premium Only */}
              <label className="flex items-center justify-between p-4 border border-gray-300 rounded-xl cursor-pointer bg-white">
                <div
                  className="flex items-center gap-2"
                  {...register("publicLesson")}
                >
                  <Globe size={20} className="text-gray-700" />
                  <span className="font-medium text-gray-700">
                    Public Lesson
                  </span>
                </div>

                <div className="relative">
                  {/* Hidden Checkbox */}
                  <input
                    type="checkbox"
                    {...register("publicLesson")}
                    className="sr-only peer"
                  />

                  {/* Toggle Background */}
                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-yellow-500 transition-colors"></div>

                  {/* Knob */}
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6"></div>
                </div>
              </label>

              {/* Premium Only */}
              <label className="flex items-center justify-between p-4 border border-gray-300 rounded-xl cursor-pointer bg-white">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-gray-700" />
                  <span className="font-medium text-gray-700">
                    Premium Only
                  </span>
                </div>

                <div className="relative">
                  {/* Hidden Checkbox — THIS must be registered */}
                  <input
                    type="checkbox"
                    {...register("premiumOnly")}
                    className="sr-only peer"
                  />

                  <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-yellow-500 transition-colors"></div>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6"></div>
                </div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 rounded-2xl font-medium hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`px-6 py-3 text-white rounded-2xl font-semibold transition ${
                isValid
                  ? "bg-yellow-500 hover:bg-gradient-to-r from-[#F5A11B] to-[#F97516] cursor-pointer"
                  : "bg-[#F1C176] blur-[1px] cursor-not-allowed"
              }`}
            >
              Publish Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLessonForm;
