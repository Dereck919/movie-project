import React from "react";
import TicketInformation from "../components/common/TicketInformation";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Ticket() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex 1 justify-center items-center pr-2">
      <h1>Welcome {user.email}</h1>
      <TicketInformation />
    </div>
  );
}

export default Ticket;
