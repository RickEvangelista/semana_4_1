import React from 'react'
import FormUpdateEvent from '../../components/updateEventForm';
import prisma from '@/lib/prisma';

async function page({params} : {params: Promise<{ id: string}> }) {
    const { id } = await params;

    const event = await prisma.evento.findUnique({
        where: {
            id_evento: Number(id)
        },
    })

    if (!event) {
        return <p>Usuário não encontrado</p>
    }


  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <FormUpdateEvent event={event} />
    </div>
  )
}

export default page;