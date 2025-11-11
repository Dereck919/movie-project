import React from "react";

function Ticket(props) {
  const ticket_id = "ahfuhqwuhw";
  const date = "Nov 21, 2025";
  const location = "AMC Plaza Bonita";

  return (
    <div className="max-w-lg m-8 shadow-lg/30 p-4">
      <p className="font-semibold">Date: {date}</p>
      <p>Location: {location}</p>
      <hr />
      <p className="mt-1">Ticker ID: {ticket_id}</p>
    </div>
  );
}

export default Ticket;
