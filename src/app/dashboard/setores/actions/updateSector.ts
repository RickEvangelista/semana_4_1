"use server";
import { FormState } from "@/types/formState";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sectorSchema } from "../schemas/sectorSchema";

export async function updateSector(
  id_setor: number,
  formData: FormData
): Promise<FormState> {
  const validateData = sectorSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Erro de validação. ",
    };
  }

  const { titulo, capacidade_total, evento_id_evento } = validateData.data;

  try {
    const event = await prisma.evento.findUnique({
      where: {
        id_evento: evento_id_evento,
      },
      include: {
        setor: true,
      },
    });

    if (!event) {
      return { success: false, message: "Evento não encontrado" };
    }

    const oldSectorCapacity = await prisma.setor.findUnique({
      where: { id_setor },
      select: {
        capacidade_total: true,
      },
    });

    if (!oldSectorCapacity) {
      return { success: false, message: "Setor não encontrado" };
    }

    const existingCapacity = event.setor.reduce(
      (acc, s) => acc + s.capacidade_total,
      0
    );

    const newCapacity = existingCapacity + capacidade_total - oldSectorCapacity.capacidade_total;
    if (newCapacity > event.capacidade_total) {
      return {
        success: false,
        message: `A capacidade do setor excede a capacidade restante do evento`,
      };
    }

    const updatedSector = await prisma.setor.update({
      where: { id_setor },
      data: {
        titulo,
        capacidade_total,
        capacidade_atual: capacidade_total,
      },
    });

    revalidatePath("/dashboard/setores");

    return {
      success: true,
      message: `Setor "${updatedSector.titulo}" atualizado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, message: "Setor já cadastrado no sistema" };
    }
  }

  return { success: false, message: "Falha ao atualizar setor" };
}
