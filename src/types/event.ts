import { evento } from "@prisma/client";


export interface Event extends evento{};


export type EventListItem = Omit<evento, "criador_id_usuario">

export type EventListItemSector = Pick<evento, "id_evento" | "titulo">