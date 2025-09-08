import { ingresso_situacao } from "@prisma/client";
import z from "zod";

export const ticketSchema = z.object({
    nome_completo: z.string().min(5, "Nome completo é obrigatório."),
    email: z.email({ message: "Email inválido." }),
    cpf: z.string().transform((val) => val.replace(/\D/g, "")).refine((val) => val.length === 11, {
        message: "CPF deve conter 11 dígitos",
    }),
    setor_id_setor: z.preprocess(val => Number(val), z.number().positive("O id do setor é obgrigatorio")),
    situacao: z.enum(ingresso_situacao).optional()
});


export type NewTicketFormData = z.infer<typeof ticketSchema>

export type UpdateUserFormData = z.infer<typeof ticketSchema>
