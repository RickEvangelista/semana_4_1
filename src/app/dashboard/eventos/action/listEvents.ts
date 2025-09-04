import prisma from "@/lib/prisma";

export async function listEvents() {
  try {
    return await prisma.evento.findMany({
      orderBy: {id_evento: "desc"},
    })

  } catch (error) {
    console.error("Erro ao listar eventos", error);
    return [];
  }
}
