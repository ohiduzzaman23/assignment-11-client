import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserDataRow from "../TableRows/UserDataRow";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const userList = users.filter((u) => u.email !== user.email);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-3">
        <div className="-mx-4 sm:-mx-3 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-200 text-gray-800 text-left text-sm font-medium tracking-wider break-words">
                    Name
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-gray-800 text-left text-sm font-medium tracking-wider break-words">
                    Email
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-gray-800 text-left text-sm font-medium tracking-wider break-words">
                    Role
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-gray-800 text-left text-sm font-medium tracking-wider break-words">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userList.map((u) => (
                  <UserDataRow
                    key={u._id.toString()}
                    user={u}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
