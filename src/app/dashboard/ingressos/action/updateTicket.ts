"use server";
import { FormState } from "@/types/formState";

import { UpdateUserFormData, userSchemaUpdate } from "../schemas/ticketSchema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUser(
  id_usuario: number,
  formData: FormData
): Promise<FormState> {
  const validateData = userSchemaUpdate.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Erro de validação. ",
    };
  }

  const { nome_completo, cpf, email, senha, perfil } =
    validateData.data as UpdateUserFormData;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id_usuario,
      },
    });

    if (!user) return { success: false, message: "Usuário não encontrado" };

    const hashPassword = senha ? await bcrypt.hash(senha, 12) : undefined;

    const userProfile = await prisma.perfil.findUnique({
      where: {
        titulo: perfil,
      },
    });

    if (!userProfile)
      return { success: false, message: "Perfil não encontrado" };

    const updateUser = await prisma.usuario.update({
      where: { id_usuario },
      data: {
        nome_completo,
        email,
        cpf,
        ...(hashPassword ? { senha: hashPassword } : {}),
        perfil_id_perfil: userProfile.id_perfil,
      },
    });

    revalidatePath("/dashboard/usuarios");

    return {
      success: true,
      message: `Usuário "${updateUser.nome_completo}" atualizado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, message: "Usuário já cadastrado no sistema" };
    }
  }

  return { success: false, message: "Falha ao atualizar usuário" };
}
