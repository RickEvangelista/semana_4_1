import { setor } from "@prisma/client";
import { EventListItemSector } from "./event";

export interface SectorListItem {
  id_setor: number;
  titulo: string;
  capacidade_total?: number;
  evento_id_evento: number;
  evento?: EventListItemSector;
}
