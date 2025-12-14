import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.authorRole || "user");
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch(`/users/${user._id}/update-role`, {
        role: updatedRole,
      });
      toast.success("Role updated successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClose={closeModal}
    >
      <DialogPanel className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <DialogTitle className="text-lg font-medium text-gray-900">
          Update User Role
        </DialogTitle>

        <select
          value={updatedRole}
          onChange={(e) => setUpdatedRole(e.target.value)}
          className="w-full mt-4 border rounded px-3 py-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleRoleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdateUserRoleModal;
