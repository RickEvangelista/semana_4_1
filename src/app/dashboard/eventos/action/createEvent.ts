"use server";

import { FormState } from "@/types/formState";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { eventSchema } from "../schemas/eventSchema";

export async function createEvent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validateData = eventSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Erro de validação. ",
    };
  }

  const { titulo, localizacao, capacidade_total, dt_inicio, dt_termino } =
    validateData.data;

  try {
    const createdEvent = await prisma.evento.create({
      data: {
        titulo,
        localizacao,
        capacidade_total: Number(capacidade_total),
        capacidade_atual: Number(capacidade_total),
        dt_inicio: dt_inicio,
        dt_termino: dt_termino,
        criador_id_usuario: 1
      },
    });

    revalidatePath("/dashboard/usuarios");

    return {
      success: true,
      message: `Evento "${createdEvent.titulo}" criado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, message: "Evento já cadastrado no sistema" };
    }
  }

  return { success: false, message: "Falha ao criar evento" };
}
