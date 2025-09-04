import z from "zod";

export const sectorSchema = z.object({
    titulo: z.string().min(3, "Titulo de evento obrigatório").max(35, "Título de evento pode ter até 35 caracteres"),
    capacidade_total:z.preprocess(val => Number(val), z.number().positive("Capacidade deve ser positiva")),
    evento_id_evento: z.preprocess(val => Number(val), z.number().positive("Capacidade deve ser positiva")),
})


export type NewEventFormData = z.infer<typeof sectorSchema>
