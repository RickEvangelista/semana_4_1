import prisma from "@/lib/prisma";

export async function listTickets() {
  try {
    return await prisma.ingresso.findMany({
      select: {
        id_ingresso: true,
        nome_completo: true,
        email: true,
        cpf: true,
        codigo: true,
        situacao: true,
        setor_id_setor: true,
        setor: {
          select: {
            titulo: true,
          },
        },
      },
      orderBy: { id_ingresso: "desc" },
    });
  } catch (error) {
    console.error("Erro ao listar ingressos", error);
    return [];
  }
}
