import React from "react";

function Ticket(props) {
  const { ticket_id, date, location } = props;

  return (
    <div className="max-w-fit m-8 shadow-lg/30 p-4 pr-70 bg-white">
      <p className="mb-1 font-semibold">Date: {date}</p>
      <p className="mb-3">Location: {location}</p>
      <hr />
      <p className="mt-3">Ticker ID: {ticket_id}</p>
    </div>
  );
}

export default Ticket;
