"use server"
import { FormState } from "@/types/formState";
import { NewUserFormData, userSchemaCreate } from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUser(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const validateData = userSchemaCreate.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validateData.success) {
        return {
            success: false,
            message: validateData.error.issues[0]?.message ?? "Erro de validação. ",
        };
    }

    const { nome_completo, cpf, email, senha, perfil } = validateData.data as NewUserFormData;

    try {
        const hashPassword = await bcrypt.hash(senha, 12);


        const profile = await prisma.perfil.findUnique({
            where: {
                titulo: perfil,
            }
        });

        if(!profile) return {success: false, message: "Perfil não encontrado"}

        const createdUser = await prisma.usuario.create({
            data: {
                nome_completo,
                cpf,
                email,
                senha: hashPassword,
                perfil_id_perfil: profile.id_perfil,
                criador_id_usuario: 1,
            }
        })

        revalidatePath("/dashboard/usuarios")

        return {
            success: true,
            message: `Usuário "${createdUser.nome_completo}" criado com sucesso! `
        }
    } catch (error: any) {
       console.error(error);
       if (error.code === "P2002") {
        return {success:false, message: "Usuário já cadastrado no sistema"}
       }
    }

    return {success:false, message: "Falha ao criar usuário"}
}
