import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRole = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/role`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRole(res.data.role || "user");
      } catch (err) {
        console.error("Failed to fetch role:", err);
        setRole("user");
      }
    };

    fetchRole();
  }, [user]);

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/profile-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 bg-[#FAEEDB] p-6 md:p-10 flex flex-col justify-center">
            <h3 className="text-base md:text-lg text-gray-700 mb-6 break-all">
              <span className="font-semibold">User Id:</span> {user?.uid}
            </h3>

            <div className="grid grid-cols-1 mr-10 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm">Name</p>
                <p className="text-xl font-bold break-all">
                  {user?.displayName || "Anonymous"}
                </p>
              </div>

              <div>
                <p className="text-sm">Email</p>
                <p className="text-xl font-bold break-all">{user?.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="mt-4">
              <p className="text-sm">Role</p>
              <p className="text-xl font-bold">{role || "user"}</p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <button className="bg-lime-500 px-8 py-2 rounded-full text-white font-semibold hover:bg-lime-700 transition-all">
                Update Profile
              </button>

              <button className="bg-[#F08D3F] hover:bg-[#a74c07] px-8 py-2 rounded-full text-white font-semibold  transition-all">
                Change Password
              </button>
            </div>
          </div>

          <div className="lg:w-1/3 relative flex flex-col items-center justify-center py-16 md:py-20">
            <div className="relative">
              <div className="rounded-full w-40 h-40 md:w-48 md:h-48 border-[6px] border-white overflow-hidden shadow-2xl">
                <img
                  src={user?.photoURL || "/images/default.jpg"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <p className="bg-lime-500 text-white px-6 py-2 rounded-full shadow-md font-semibold text-center">
                  {role || "User"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
