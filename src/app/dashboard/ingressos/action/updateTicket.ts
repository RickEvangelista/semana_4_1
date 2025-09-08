"use server";
import { FormState } from "@/types/formState";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketSchema } from "../schemas/ticketSchema";


export async function updateTicket(
  id_ingresso: number,
  formData: FormData
): Promise<FormState> {
  const validateData = ticketSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success) {
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Erro de validação. ",
    };
  }

  const { nome_completo, cpf, email, setor_id_setor, situacao  } =
    validateData.data;
  
  try {
    const sector = await prisma.setor.findUnique({
      where: {
        id_setor: setor_id_setor,
      },
    })
    if(!sector) return { success: false, message: "Setor não encontrado" }
    const updatedTicket = await prisma.ingresso.update({
      where: {id_ingresso},
      data: {
        nome_completo,
        cpf,
        email,
        setor_id_setor: sector?.id_setor,
      },
    });

    revalidatePath("/dashboard/ingressos");

    return {
      success: true,
      message: `Ingresso "${updatedTicket.nome_completo}" criado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { success: false, message: "Ingresso com código duplicado, tente novamente" };
    }
  }

  return { success: false, message: "Falha ao atualizar ingresso usuário" };
}
