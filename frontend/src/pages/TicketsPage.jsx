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
    <div className="flex flex-row">
      <div className="">
        <h2 className="my-10 mx-4 pr-20 pb-130 text-white font-normal">
          Welcome! 
          <div className="font-semibold">
            {user.email}
          </div>
        </h2>
      </div>
      <div className="">
        <TicketInformation />
      </div>
    </div>
  );
}

export default Ticket;
