"use server"

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";

export default async function deleteEvent(
  id_evento: number
): Promise<FormState> {
  try {
    await prisma.evento.delete({
      where: {
        id_evento,
      },
    });

    revalidatePath("/dashboard/eventos");

    return { success: true, message: "Evento deletado com sucesso" };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { success: false, message: "Evento não encontrado" };
    }

    console.error("Erro ao deletar evento:", error);

    return { success: false, message: "Falha ao deletar evento" };
  }
}
