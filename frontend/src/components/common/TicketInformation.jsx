import React from 'react'
import Ticket from './Ticket'

function TicketInformation() {
  return (
    <div class="flex flex-col min-h-screen">
        <div class="py-20 bg-black mx-8 rounded-lg p-4">
            <h2 class="text-white text-3xl font-semibold">My Tickets</h2>
        </div>
        <div class="">
            <Ticket />
            <Ticket />
            <Ticket />
        </div>
    </div>
  )
}

export default TicketInformation