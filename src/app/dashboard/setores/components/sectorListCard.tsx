"use client";

import Button from "@/components/Button";
import CardItem from "@/components/CardItem";
import Link from "next/link";
import { useState } from "react";
import deleteSector from "../actions/deleteSector";
import { SectorListItem } from "@/types/sector";

interface sectorListProps {
  sectors: SectorListItem[];
}

export default function SectorList({ sectors }: sectorListProps) {
  const [modalSector, setModalSector] = useState<number | null>(null);

  const handleDeleteClick = (id_setor: number) => {
    setModalSector(id_setor);
  };

  const handleConfirmDelete = async () => {
    if (modalSector === null) return;
    const result = await deleteSector(modalSector);
    setModalSector(null);
  };
''
  const handleCancelDelete = () => {
    setModalSector(null);
  };

  return (
    <div className="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sectors.length === 0 ? (
        <p className="text-center text-dark-gray">Nenhum setor encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((setor) => (
            <div key={setor.id_setor}>
              <CardItem
                title={setor.titulo}
                content={
                  <>
                  <p>{setor.evento?.titulo}</p>
                    <p>{`Capacidade: ${setor.capacidade_total} / ${setor.capacidade_total}`}</p>
                  </>
                }
                actions={
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/dashboard/setores/${setor.id_setor}/editar`}
                      className={"text-custom-blue hover:underline"}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      className={"w-1/2"}
                      onClick={() => handleDeleteClick(setor.id_setor)}
                    >
                      Deletar
                    </Button>
                  </div>
                }
                borderColor="border-custom-orange"
              />
            </div>
          ))}
        </div>
      )}

      {modalSector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl text-center font-semibold mb-4">
              Confirmar exclusão
            </h2>
            <p className="mb-6">
              Tem certeza que deseja deletar este setor? Isso excluirá todos os
              setores e ingressos relacionados a esse setor.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                className={"w-1/2"}
                onClick={handleCancelDelete}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                className={"w-1/2"}
                onClick={handleConfirmDelete}
              >
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
