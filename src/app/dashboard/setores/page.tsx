import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { listSectors } from "./actions/listSectors";
import SectorListCard from "./components/sectorListCard";

async function page() {
  const sectors = await listSectors();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col w-full md:flex-row justify-between mb-5">
        <h1 className="text-5xl font-semibold">Gerenciar Setores</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <Link href={`/dashboard/setores/criar`}>
            <Button variant="primary" className={"w-40"}>
              Novo Setor
            </Button>
          </Link>
        </div>
      </div>
      <SectorListCard sectors={sectors} />
    </div>
  );
}

export default page;
