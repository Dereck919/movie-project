import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteCartButton({ session, id }) {
  const handleDelete = async () => {
    if (!session) return;

    try {
      const response = await fetch(`http://localhost:8000/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "failed");
      }

      console.log("deleted");
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="px-1 py-1 text-white rounded-md cursor-pointer"
      >
        <span>
          <AiOutlineDelete className="hover:text-red-500" />
        </span>
      </button>
    </div>
  );
}

export default DeleteCartButton;
