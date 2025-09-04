import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { listEvents } from "./action/listEvents";
import EventListCard from "./components/eventListCard";

async function page() {
  const events = await listEvents();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col w-full md:flex-row justify-between mb-5">
        <h1 className="text-5xl font-semibold">Gerenciar Eventos</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <Link href={`/dashboard/eventos/criar`}>
            <Button variant="primary" className={"w-40"}>
              Novo Evento
            </Button>
          </Link>
        </div>
      </div>
      <EventListCard events={events} />
    </div>
  );
}

export default page;
