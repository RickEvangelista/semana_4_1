"use server";
import { FormState } from "@/types/formState";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { eventSchema } from "../schemas/eventSchema";

export async function updateEvent(
  id_evento: number,
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
    const event = await prisma.evento.findUnique({
      where: { id_evento },
    });

    if (!event) {
      return { success: false, message: "Evento não encontrado no sistema" };
    }

    const updatedEvent = await prisma.evento.update({
      where: { id_evento },
      data: {
        titulo,
        localizacao,
        capacidade_total,
        capacidade_atual: capacidade_total,
        dt_inicio,
        dt_termino,
      },
    });

    revalidatePath("/dashboard/eventos");

    return {
      success: true,
      message: `Usuário "${updatedEvent.titulo}" atualizado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, message: "Evento já cadastrado no sistema" };
    }
  }

  return { success: false, message: "Falha ao atualizar evento" };
}
