"use server";
import { FormState } from "@/types/formState";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketSchema } from "../schemas/ticketSchema";
import { customAlphabet } from "nanoid";
import { ingresso_situacao } from "@prisma/client";

export async function createTicket(
  prevState: FormState,
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

  const { nome_completo, cpf, email, setor_id_setor } = validateData.data;

  const nanoid = customAlphabet("ABCDEFGHiJKLMNOPQRSTUVWXYZ0123456789", 6);

  const sector = await prisma.setor.findUnique({
    where: {
      id_setor: setor_id_setor,
    },
    select: { evento_id_evento: true, id_setor: true, capacidade_total: true },
  });

  if (!sector) return { success: false, message: "Setor não encontrado" };

  const soldTickets = await prisma.ingresso.count({
    where: {
      setor_id_setor,
      situacao: { in: [ingresso_situacao.ativo, ingresso_situacao.utilizado] },
    },
  });

  if(soldTickets >= sector.capacidade_total) return { success: false, message: "Capacidade esgotada" };

  const ticketForCpf = await prisma.ingresso.count({
    where: {
      cpf,
      setor: { evento_id_evento: sector.evento_id_evento },
    },
  });

  if (ticketForCpf >= 5)
    return {
      success: false,
      message: "Limite de 5 ingressos para esse CPF já foi atingido",
    };

  try {
    const codigo = nanoid();

    const createdTicket = await prisma.ingresso.create({
      data: {
        codigo,
        nome_completo,
        cpf,
        email,
        situacao: ingresso_situacao.ativo,
        setor_id_setor: sector?.id_setor,
        criador_id_usuario: 1,
      },
    });

    revalidatePath("/dashboard/ingressos");

    return {
      success: true,
      message: `Ingresso "${createdTicket.nome_completo}" criado com sucesso! `,
    };
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return {
        success: false,
        message: "Ingresso com código duplicado, tente novamente",
      };
    }
  }

  return { success: false, message: "Falha ao criar usuário" };
}
