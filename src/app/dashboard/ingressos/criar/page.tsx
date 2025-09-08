import React from "react";
import FormCreateTicket from "../components/createTicketForm";
import prisma from "@/lib/prisma";
import { getEvents, getSectorLocation } from "@/lib/utilis";


async function page() {
  const eventsData = await getEvents()
  const data = await getSectorLocation()
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FormCreateTicket events={eventsData} sectors={data} />
    </div>
  );
}

export default page;
