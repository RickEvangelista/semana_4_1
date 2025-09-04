import z, { date } from "zod";

export const eventSchema = z.object({
    titulo: z.string().min(3, "Titulo de evento obrigatório").max(35, "Título de evento pode ter até 35 caracteres"),
    localizacao: z.string().min(1, "Localização evento é obrigatória").max(35, "localização do evento pode ter até 35 caracteres"),
    capacidade_total:z.preprocess(val => Number(val), z.number().positive("Capacidade deve ser positiva")),
    dt_inicio: z.preprocess(val => new Date(val as string), z.date()),
    dt_termino: z.preprocess(val => new Date(val as string), z.date()),
})


export type NewEventFormData = z.infer<typeof eventSchema>
