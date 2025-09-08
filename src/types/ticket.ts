import { ingresso } from "@prisma/client";

export type TicketListItem = Omit<
  ingresso,
  "validador_id_usuario" | "criador_id_usuario"
> & {
    setor: {
        id_setor: number;
        titulo: string;
        evento: {
            id_evento: number;
            titulo: string;
        }
    }
}
