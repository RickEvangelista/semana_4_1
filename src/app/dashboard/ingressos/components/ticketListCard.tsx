//userListCard

"use client";

import Button from "@/components/Button";
import CardItem from "@/components/CardItem";
import Link from "next/link";
import { useState } from "react";
import deleteTicket from "../action/cancelTicket";
import { TicketListItem } from "@/types/ticket";

interface TicketListProps {
  tickets: TicketListItem[];
}

export default function TicketList({ tickets }: TicketListProps) {

  const [modalTicket, setModalTicket] = useState<number | null>(null);

  const handleDeleteClick = (id_ticket: number) => {
    setModalTicket(id_ticket);
  };

  const handleConfirmDelete = async () => {
    if (modalTicket === null) return;

    const result = await deleteTicket(modalTicket);
    setModalTicket(null);
  };

  const handleCancelDelete = () => {
    setModalTicket(null);
  };

  return (
    <>
      {tickets.length === 0 ? (
        <p className="text-center text-dark-gray">Nenhum ticket encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
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
                      href={`/dashboard/tickets/${ticket.id_ingresso}/editar`}
                      className={"text-custom-blue hover:underline"}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      className={"w-1/2"}
                      onClick={() => handleDeleteClick(ticket.id_ingresso)}
                    >
                      Deletar
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
            <h2 className="text-xl text-center font-semibold mb-4">Confirmar exclusão</h2>
            <p className="mb-6">
              Tem certeza que deseja deletar este ticket? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" className={"w-1/2"} onClick={handleCancelDelete}>
                Cancelar
              </Button>
              <Button variant="danger" className={"w-1/2"} onClick={handleConfirmDelete}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
