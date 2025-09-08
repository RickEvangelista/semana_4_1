import React from "react";
import FormCreateSector from "../components/createSectorForm";
import prisma from "@/lib/prisma";
import { getEvents } from "@/lib/utilis";

async function page() {
  const events = await getEvents()
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FormCreateSector events={events}/>
    </div>
  );
}

export default page;
