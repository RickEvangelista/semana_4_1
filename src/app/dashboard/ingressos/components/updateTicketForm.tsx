//createTicketForm

"use client";

import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import React, { useActionState, useState } from "react";
import { EventListItemSector } from "@/types/event";
import { SectorListItem } from "@/types/sector";
import InputMasked from "@/components/InputMasked";
import { updateTicket } from "../action/updateTicket";
import { TicketListItem } from "@/types/ticket";
import { FormState } from "@/types/formState";

interface TicketFormProps {
  events: EventListItemSector[];
  sectors: SectorListItem[];
  ticket: TicketListItem;
}

function FormUpdateTicket({ events, sectors, ticket }: TicketFormProps) {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    async (previousState: FormState, formData: FormData) =>
      updateTicket(ticket.id_ingresso, formData),
    initialState
  );
  console.log("Eventos recebidos:", events);
  console.log("Setores recebidos:", sectors);

  const [selectedEvent, setSelectedEvent] = useState<number | null>(ticket.setor.evento.id_evento);

  const eventOptions = events.map((event) => ({
    label: event.titulo,
    value: event.id_evento,
  }));

  const filteredSectors = selectedEvent
    ? sectors.filter((s) => s.evento_id_evento === selectedEvent)
    : [];

  const filteredSectorValues = filteredSectors.map((s) => ({
    label: s.titulo,
    value: s.id_setor,
  }));

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Atualizar Ingresso
      </h1>
      <Input
        label={"Nome completo:"}
        name={"nome_completo"}
        placeholder="Digite o seu nome completo"
        defaultValue={ticket.nome_completo}
      />
      <Input
        label={"E-mail:"}
        name={"email"}
        placeholder="Digite o seu email"
        defaultValue={ticket.email}
      />
      <InputMasked
        label={"CPF:"}
        name={"cpf"}
        placeholder="Digite o cpf"
        mask={"000.000.000-00"}
        defaultValue={ticket.cpf}
      />
      <DropDown
        placeholder={"Selecione um evento "}
        name={"evento_id_evento"}
        label={"Evento: "}
        options={eventOptions}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
        defaultValue={ticket.setor.evento.id_evento}
      />
      <DropDown
        placeholder={"Selecione um setor "}
        name={"setor_id_setor"}
        label={"Setor: "}
        options={filteredSectorValues}
        disabled={!selectedEvent}
        defaultValue={ticket.setor.id_setor}
      />
      <Button
        children={"Criar"}
        className="bg-custom-blue"
        type="submit"
        disabled={isPending}
      />
      {state.message && (
        <div
          className={`w-full flex justify-center items-center mt-4 p-4 rounded-md ${
            state.success ? "text-custom-green" : "text-custom-orange"
          }`}
        >
          <p className="font-bold">{state.message}</p>
        </div>
      )}
    </form>
  );
}

export default FormUpdateTicket;
