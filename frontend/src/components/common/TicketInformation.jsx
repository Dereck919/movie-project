import React from "react";

function TicketInformation({ id }) {
  const date = new Date();
  const formatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  return (
    <div className="my-6 flex flex-col min-h-screen">
      <div className="">
        <div className="max-w-fit shadow-lg/30 p-4 pr-70 bg-white">
          <p className="mb-1 font-semibold">Date: {formatted}</p>
          <p className="mb-3">Location: SDSU</p>
          <hr />
          <p className="mt-3">Ticket ID: {id}</p>
        </div>
      </div>
    </div>
  );
}

export default TicketInformation;
