import React from "react";
import Ticket from "./Ticket";

function TicketInformation() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-20 bg-black mx-8 rounded-lg p-4">
        <h2 className="text-white text-3xl font-semibold">My Tickets</h2>
      </div>
      <div className="">
        <Ticket />
        <Ticket />
        <Ticket />
      </div>
    </div>
  );
}

export default TicketInformation;
