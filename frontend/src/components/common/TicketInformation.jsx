import React from "react";
import Ticket from "./Ticket";

function TicketInformation() {
  return (
    <div className="my-6 flex flex-col min-h-screen">
      <div className="mx-4 rounded-lg p-4">
        <h2 className="text-white text-3xl font-semibold ">My Tickets</h2>
      </div>
      <div className="">
        <Ticket
          date="November 32nd 2025"
          location="Mars"
          ticket_id="123456mfnjsandsad912381"
        />
      </div>
    </div>
  );
}

export default TicketInformation;
