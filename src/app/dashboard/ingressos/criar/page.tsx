import React from "react";
import FormCreateUser from "../components/createTicketForm";
import FormCreateTicket from "../components/createTicketForm";

async function page() {
    const events = await prisma.


  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FormCreateTicket events={[]} sectors={[]}/>
    </div>
  );
}

export default page;
