"use server"

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";

export default async function deleteUser(
  id_usuario: number
): Promise<FormState> {
  try {
    await prisma.usuario.delete({
      where: {
        id_usuario,
      },
    });

    revalidatePath("/dashboard/usuarios");

    return { success: true, message: "Usuário deletado com sucesso" };
  } catch (error: any) {
    if (error.code === "P2025") {
      return { success: false, message: "Usuário não encontrado" };
    }

    console.error("Erro ao deletar usuário:", error);

    return { success: false, message: "Falha ao deletar usuário" };
  }
}
