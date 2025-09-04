//usuarios/page

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import TicketList from "./components/ticketListCard";
import { listTickets } from "./action/listTickets";

async function page() {
  const tickets = await listTickets();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col w-full md:flex-row justify-between mb-5">
        <h1 className="text-5xl font-semibold">Gerenciar Ingressos</h1>
        <div className="flex flex-col md:flex-row">
          <Link href={`/dashboard/ingressos/criar`}>
            <Button variant="primary" className={"w-40"}>
              Novo usuário
            </Button>
          </Link>
        </div>
      </div>
      <TicketList tickets={tickets}/>
    </div>
  );
}

export default page;

