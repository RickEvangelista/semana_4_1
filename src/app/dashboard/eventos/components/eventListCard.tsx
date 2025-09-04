"use client";

import Button from "@/components/Button";
import CardItem from "@/components/CardItem";
import { EventListItem } from "@/types/event";
import Link from "next/link";
import { useState } from "react";
import deleteEvent from "../action/deleteEvent";

interface eventListProps {
  events: EventListItem[];
}

export default function EventList({ events }: eventListProps) {
  const [modalEvent, setModalEvent] = useState<number | null>(null);

  const handleDeleteClick = (id_evento: number) => {
    setModalEvent(id_evento);
  };

  const handleConfirmDelete = async () => {
    if (modalEvent === null) return;
    const result = await deleteEvent(modalEvent);
    setModalEvent(null);
  };

  const handleCancelDelete = () => {
    setModalEvent(null);
  };

  return (
    <div className="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.length === 0 ? (
        <p className="text-center text-dark-gray">Nenhum evento encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evento) => (
            <div key={evento.id_evento}>
              <CardItem
                title={evento.titulo}
                content={
                  <>
                    <p>
                      {new Date(evento.dt_inicio).toLocaleDateString("pt-BR")} -{" "}
                      {new Date(evento.dt_termino).toLocaleDateString("pt-BR")}
                      </p>
                      <p>{evento.localizacao}</p>
                    <p>{`Capacidade: ${evento.capacidade_atual} / ${evento.capacidade_total}`}</p>
                  </>
                }
                actions={
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/dashboard/eventos/${evento.id_evento}/editar`}
                      className={"text-custom-blue hover:underline"}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      className={"w-1/2"}
                      onClick={() => handleDeleteClick(evento.id_evento)}
                    >
                      Deletar
                    </Button>
                  </div>
                }
                borderColor="border-custom-yellow"
              />
            </div>
          ))}
        </div>
      )}

      {modalEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl text-center font-semibold mb-4">
              Confirmar exclusão
            </h2>
            <p className="mb-6">
              Tem certeza que deseja deletar este evento? Isso excluirá todos os
              setores e ingressos relacionados a esse evento.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                className={"w-1/2"}
                onClick={handleCancelDelete}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                className={"w-1/2"}
                onClick={handleConfirmDelete}
              >
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
