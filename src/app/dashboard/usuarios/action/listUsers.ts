import prisma from "@/lib/prisma";

export async function listUsers() {
  try {
    return await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nome_completo: true,
        email: true,
        cpf: true,
        perfil_id_perfil: true,
        perfil: {
          select: {
            titulo: true,
          },
        },
      },
      orderBy: { id_usuario: "desc" },
    });
  } catch (error) {
    console.error("Erro ao listar usuários", error);
    return [];
  }
}
