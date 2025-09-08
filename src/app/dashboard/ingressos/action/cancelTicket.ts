"use server"

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { ingresso_situacao } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function cancelTicket(
  id_ingresso: number
): Promise<FormState> {
  try {
    await prisma.ingresso.update({
      where: {
        id_ingresso,
      },
      data: {
        situacao: ingresso_situacao.cancelado,
      }
    });

    revalidatePath("/dashboard/ingressos");

    return { success: true, message: "Ingresso deletado com sucesso" };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { success: false, message: "Ingresso não encontrado" };
    }

    console.error("Erro ao cancelar ingresso:", error);

    return { success: false, message: "Falha ao cancelar ingresso" };
  }
}
