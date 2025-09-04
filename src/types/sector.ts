import { setor } from "@prisma/client";
import { EventListItemSector } from "./event";

export interface SectorListItem {
  id_setor: number;
  titulo: string;
  capacidade_atual: number;
  capacidade_total: number;
  evento: EventListItemSector;
}
