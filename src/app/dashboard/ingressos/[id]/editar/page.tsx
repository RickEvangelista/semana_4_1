import React from 'react'
import prisma from '@/lib/prisma';
import { getEvents, getSectorLocation } from '@/lib/utilis';
import FormUpdateTicket from '../../components/updateTicketForm';

async function page({params} : {params: Promise<{ id: string}> }) {
    const { id } = await params;
      const eventsData = await getEvents()
      const data = await getSectorLocation()

    const ticket = await prisma.ingresso.findUnique({
        where: {
            id_ingresso: Number(id)
        },
        include: {
            setor: {
                include: {
                    evento: true,
                }
            }
        }
    })

    if (!ticket) {
        return <p>Ingresso não encontrado</p>
    }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <FormUpdateTicket ticket={ticket}
         events={eventsData} sectors={data} />
    </div>
  )
}

export default page;