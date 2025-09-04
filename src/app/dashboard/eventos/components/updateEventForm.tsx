"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useActionState } from "react";
import { FormState } from "@/types/formState";
import { EventListItem } from "@/types/event";
import { updateEvent } from "../action/updateEvent";

interface UpdateEventFormProps {
  event: EventListItem[];
}

function FormUpdateEvent({ event }: { event: EventListItem }) {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    async (previousState: FormState, formData: FormData) =>
      updateEvent(event.id_evento, formData),
    initialState
  );

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Atualização de evento
      </h1>
      <Input
        label={"Titulo: "}
        name={"titulo"}
        placeholder="Digite o titulo do evento"
        defaultValue={event.titulo}
      />
      <Input
        label={"Localização:"}
        name={"localizacao"}
        placeholder="Digite a localizacao do evento"
        defaultValue={event.localizacao}
      />
      <Input
        label={"Capacidade:"}
        name={"capacidade_total"}
        placeholder="Digite o seu nome completo"
        defaultValue={event.capacidade_total}
      />
      <Input
        type="date"
        label={"Data de início: "}
        name={"dt_inicio"}
        placeholder="Digite a data de iníco do evento"
        defaultValue={new Date(event.dt_inicio).toISOString().split("T")[0]}
      />
      <Input
        type="date"
        label={"Data de termino: "}
        name={"dt_termino"}
        placeholder="Digite a data de termino do evento"
        defaultValue={new Date(event.dt_termino).toISOString().split("T")[0]}
      />
      <Button className="bg-custom-blue" type="submit">
        Atualizar
      </Button>

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

export default FormUpdateEvent;
