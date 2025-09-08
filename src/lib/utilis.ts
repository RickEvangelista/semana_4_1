import prisma from "@/lib/prisma";

export async function getSectorLocation() {
  const sectors = await prisma.setor.findMany({
    include: {
      ingresso: {
        where: { situacao: { in: ["ativo", "utilizado"] } },
        select: { id_ingresso: true },
      },
    },
  });

  const formattedSectors = sectors.map((s) => ({
    id_setor: s.id_setor,
    titulo: `${s.titulo} (Disponível: ${
      s.capacidade_total - s.ingresso.length
    })`,
    evento_id_evento: s.evento_id_evento,
  }));
  return formattedSectors;
}

export async function getEvents() {
  const events = await prisma.evento.findMany({
    select: {
      id_evento: true,
      titulo: true,
    },
  });
  return events;
}
