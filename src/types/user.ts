// types/user.ts
import { usuario } from "@prisma/client";

export interface user extends usuario {
  perfil: {
    titulo: string;
  };
}

export type UserListItem = Omit<
  usuario,
  "senha" | "perfil_id_perfil" | "criador_id_usuario"
> & {
  perfil: {
    titulo: string;
  }
};