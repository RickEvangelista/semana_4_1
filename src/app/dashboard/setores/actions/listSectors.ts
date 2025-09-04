import prisma from "@/lib/prisma";

export async function listSectors() {
  try {
    return await prisma.setor.findMany({
      include: {
        evento: {
          select: {
            titulo: true,
            id_evento: true,
          },
        },
      },
      orderBy: { id_setor: "desc" },
    });
  } catch (error) {
    console.error("Erro ao listar setores", error);
    return [];
  }
}
