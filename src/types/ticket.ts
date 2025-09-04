import { ingresso } from "@prisma/client";

export type TicketListItem = Omit<ingresso, "validador_id_usuario" | "criador_id_usuario" >