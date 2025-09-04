import React from 'react'
import FormUpdateUser from '../../components/updateUserForm';
import prisma from '@/lib/prisma';

async function page({params} : {params: Promise<{ id: string}> }) {
    const { id } = await params;

    const user = await prisma.usuario.findUnique({
        where: {
            id_usuario: Number(id)
        },
        include: {
            perfil: true
        }
    })

    if (!user) {
        return <p>Usuário não encontrado</p>
    }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <FormUpdateUser user={user} />
    </div>
  )
}

export default page;