"use server"

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";

export default async function deleteSector(
  id_setor: number
): Promise<FormState> {
  try {
    await prisma.setor.delete({
      where: {
        id_setor,
      },
    });

    revalidatePath("/dashboard/setor");

    return { success: true, message: "Setor deletado com sucesso" };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { success: false, message: "Setor não encontrado" };
    }

    console.error("Erro ao deletar setor", error);

    return { success: false, message: "Falha ao deletar setor" };
  }
}
