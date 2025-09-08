import z from "zod";

export const BaseUserSchema = z.object({
    nome_completo: z.string().min(5, "Nome completo é obrigatório."),
    email: z.email({ message: "Email inválido." }),
    cpf: z.string().transform((val) => val.replace(/\D/g, "")).refine((val) => val.length === 11, {
        message: "CPF deve conter 11 dígitos",
    }),
    perfil: z.string().min(1, "Perfil é obrigatório. "),
});

export const userSchemaCreate = BaseUserSchema.extend({
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres. "),
});

export const userSchemaUpdate = BaseUserSchema.extend({
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres. ").optional().or(z.literal('')),
})

export type NewUserFormData = z.infer<typeof userSchemaCreate>

export type UpdateUserFormData = z.infer<typeof userSchemaUpdate>
