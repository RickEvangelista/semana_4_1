"use client";

import { FormState } from "@/types/formState";
import React, { useActionState, useState } from "react";
import { validateTicket } from "../actions/validateTicket";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function TicketValidationForm() {
  const initialState: FormState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) =>
      validateTicket(formData),
    initialState
  );

  const [disabledButton, setDisabledButton] = useState(true);

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 custom-blue p-5 rounded-md md:w-100 gap-2"
    >
      <h1 className="text-center text-custom-blue text-5xl">
       Validação de Ingresso
      </h1>
      <Input
        label={"Codigo:"}
        name={"codigo"}
        placeholder="Digite o código do ingresso"
        onChange={(e) => setDisabledButton(false)}
      />

      <Button type="submit" disabled={disabledButton}>
        {"Validar"}
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
