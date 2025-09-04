import { ingresso_situacao } from "@prisma/client";
import z from "zod";

export const ticketSchema = z.object({
    nome_completo: z.string().min(5, "Nome completo é obrigatório."),
    email: z.email({ message: "Email inválido." }),
    cpf: z.string().length(11, "CPF deve ser válido"),
    setor: z.string().min(1, "O setor é obrigatório. "),
    situacao: z.enum(ingresso_situacao)
});


export type NewUserFormData = z.infer<typeof userSchemaCreate>

export type UpdateUserFormData = z.infer<typeof userSchemaUpdate>
