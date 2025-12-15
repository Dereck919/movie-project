import React from "react";
import TicketInformation from "../components/common/TicketInformation";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAuth } from "../context/AuthProvider";

function Ticket() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const { session } = useAuth();

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

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch("http://localhost:8000/tickets", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const data = await response.json();
        setId(data.tickets.id);
      } catch (error) {
        console.error("No Ticket", error);
      }
    }

    fetchTicket();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {id ? (
        <div className="flex-row m-10">
          <h1 className="text-white font-bold">Welcome back, {user.email}</h1>
          <TicketInformation id={id} />
        </div>
      ) : (
        <div className="grid gap-10 m-10">
          <h1 className="text-white font-bold">Welcome back, {user.email}</h1>
          <h2 className="text-white font-bold">No ticket found 😢</h2>
        </div>
      )}
    </div>
  );
}

export default Ticket;
