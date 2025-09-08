//userListCard

"use client";

import Button from "@/components/Button";
import CardItem from "@/components/CardItem";
import Link from "next/link";
import { useState } from "react";
import cancelTicket from "../action/cancelTicket";
import { TicketListItem } from "@/types/ticket";
import Input from "@/components/Input";

interface TicketListProps {
  tickets: TicketListItem[];
}

export default function TicketList({ tickets }: TicketListProps) {
  const [search, setSearch] = useState("")
  const [modalTicket, setModalTicket] = useState<number | null>(null);

  const handleActionClick = (id_ticket: number) => {
    setModalTicket(id_ticket);
  };

  const handleConfirmAction = async () => {
    if (modalTicket === null) return;

    const result = await cancelTicket(modalTicket);
    setModalTicket(null);
  };

  const handleCancelAction = () => {
    setModalTicket(null);
  };

  const filteredTickets = tickets.filter(
    (u) =>
      u.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      u.situacao.toLocaleLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <Input
        label={""}
        name={"filtros"}
        placeholder="Pesquise um ingresso por nome ou situação"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredTickets.length === 0 ? (
        <p className="text-center text-dark-gray">Nenhum ticket encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id_ingresso}>
              <CardItem
                title={ticket.nome_completo}
                content={
                  <>
                    <p>{ticket.email}</p>
                    <p>{ticket.codigo}</p>
                    <p>{ticket.situacao}</p>
                  </>
                }
                actions={
                  <div className="flex justify-between items-center">
                    <Link
                      href={ticket.situacao === 'cancelado'? "#": `/dashboard/ingressos/${ticket.id_ingresso}/editar`}
                      className={`text-custom-blue ${ticket.situacao ==='cancelado'? 'opacity-50 pointer-events-none': 'hover:underline'}`}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      className={"w-1/2"}
                      onClick={() => handleActionClick(ticket.id_ingresso)}
                      disabled={ticket.situacao === "cancelado"}
                    >
                      Cancelar
                    </Button>
                  </div>
                }
                borderColor="border-custom-blue"
              />
            </div>
          ))}
        </div>
      )}

      {modalTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl text-center font-semibold mb-4">
              Confirmar exclusão
            </h2>
            <p className="mb-6">
              Tem certeza que deseja cancelar este ingresso? Esta ação não pode ser
              desfeita.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                className={"w-1/2"}
                onClick={handleCancelAction}
              >
                Voltar
              </Button>
              <Button
                variant="danger"
                className={"w-1/2"}
                onClick={handleConfirmAction}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
