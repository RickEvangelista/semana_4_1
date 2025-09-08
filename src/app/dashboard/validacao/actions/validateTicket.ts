"use server"

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { ingresso_situacao } from "@prisma/client";

export async function validateTicket(formData: FormData): Promise<FormState> {
  const code = String(formData.get("codigo") || "")
    .trim()
    .toUpperCase();

  if (!code || code.length > 6) return { success: false, message: "Ingresso Inválido" };

  try {
    const ticket = await prisma.ingresso.findUnique({
      where: { codigo: code },
    });

    if (!ticket) return { success: false, message: "Ingresso não encontrado" };

    if (ticket.situacao !== ingresso_situacao.ativo) {
      return {
        success: false,
        message: `O ingresso ${
          ingresso_situacao.utilizado ? "já foi utilizado" : "cancelado"
        }`,
      };
    }

    const validation = await prisma.ingresso.update({
      where: { codigo: code },
      data: {
        situacao: ingresso_situacao.utilizado,
      },
    });
    if (validation)
      return { success: true, message: "Ingresso Validado com successo" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Erro ao validar ingresso" };
  }

  return { success: false, message: "Erro inesperado na validação" };
}
