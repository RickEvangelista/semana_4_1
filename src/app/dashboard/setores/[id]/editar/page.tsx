import React from "react";
import FormUpdateEvent from "../../components/updateSectorForm";
import prisma from "@/lib/prisma";
import FormUpdateSector from "../../components/updateSectorForm";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sector = await prisma.setor.findUnique({
    where: {
      id_setor: Number(id),
    },
  });

  if (!sector) {
    return <p>Usuário não encontrado</p>;
  }

  const events = await prisma.evento.findMany({
    select: {
      id_evento: true,
      titulo: true,
    },
  });

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FormUpdateSector sector={sector} events={events} />
    </div>
  );
}

export default page;
