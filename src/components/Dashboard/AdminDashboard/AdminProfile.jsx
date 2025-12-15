import React, { useState, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Upload } from "lucide-react";
import { imageUpload } from "../../../utils";

const AdminProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoFile(file);
  };

  const handleUpdateProfile = async () => {
    if (!name) return setMessage("Name cannot be empty");
    setLoading(true);
    setMessage("");

    try {
      let photoURL = user?.photoURL || "";
      if (photoFile) {
        photoURL = await imageUpload(photoFile);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setPhotoFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center bg-gray-100 px-4">
      <div className="space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Admin Profile</h1>

        <div className="p-6 mt-15 bg-white shadow rounded-xl flex flex-col items-center">
          {/* Name */}
          <h2 className="text-xl font-semibold mb-2">Name:</h2>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-2 text-center"
            />
          ) : (
            <p className="text-gray-700">{user?.displayName || "Admin"}</p>
          )}

          {/* Photo */}
          <h2 className="text-xl font-semibold mt-4 mb-2">Photo</h2>
          <img
            src={
              photoFile
                ? URL.createObjectURL(photoFile)
                : user?.photoURL || "https://i.pravatar.cc/150"
            }
            alt="Admin"
            className="w-32 h-32 rounded-full mb-4"
          />
          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2 mb-2"
              >
                <Upload size={18} /> Upload Photo
              </button>
            </>
          )}

          {/* Message */}
          {message && <p className="mt-2 text-sm text-red-500">{message}</p>}

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loading ? "Updating..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
