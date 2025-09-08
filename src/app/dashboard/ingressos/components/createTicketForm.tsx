//createTicketForm

"use client";

import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import React, { useActionState, useState } from "react";
import { EventListItemSector } from "@/types/event";
import { SectorListItem } from "@/types/sector";
import { createTicket } from "../action/createTicket";
import InputMasked from "@/components/InputMasked";

interface TicketFormProps {
  events: EventListItemSector[];
  sectors: SectorListItem[];
}

function FormCreateTicket({ events, sectors }: TicketFormProps) {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    createTicket,
    initialState
  );
  console.log("Eventos recebidos:", events);
  console.log("Setores recebidos:", sectors);

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

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
        Cadastro de Usuario
      </h1>
      <Input
        label={"Nome completo:"}
        name={"nome_completo"}
        placeholder="Digite o seu nome completo"
      />
      <Input
        label={"E-mail:"}
        name={"email"}
        placeholder="Digite o seu email"
      />
      <InputMasked
        label={"CPF:"}
        name={"cpf"}
        placeholder="Digite o cpf"
        mask={"000.000.000-00"}
      />
      <DropDown
        placeholder={"Selecione um evento "}
        name={"evento_id_evento"}
        label={"Evento: "}
        options={eventOptions}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
      />
      <DropDown
        placeholder={"Selecione um setor "}
        name={"setor_id_setor"}
        label={"Setor: "}
        options={filteredSectorValues}
        disabled={!selectedEvent}
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

export default FormCreateTicket;
