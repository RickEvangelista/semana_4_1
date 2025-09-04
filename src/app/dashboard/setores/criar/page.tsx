import React from "react";
import FormCreateSector from "../components/createSectorForm";
import prisma from "@/lib/prisma";

async function page() {
  const events = await prisma.evento.findMany({
    select: {
      id_evento: true,
      titulo: true,
    }
  })
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FormCreateSector events={events}/>
    </div>
  );
}

export default page;
