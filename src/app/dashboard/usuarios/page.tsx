//usuarios/page

import React from "react";
import Link from "next/link";
import { listUsers } from "./action/listUsers";
import Button from "@/components/Button";
import UserList from "./components/userListCard";

async function page() {
  const users = await listUsers();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col w-full md:flex-row justify-between mb-5">
        <h1 className="text-5xl font-semibold">Gerenciar Usuários</h1>
        <div className="flex flex-col md:flex-row">
          <Link href={`/dashboard/usuarios/criar`}>
            <Button variant="primary" className={"w-40"}>
              Novo usuário
            </Button>
          </Link>
        </div>
      </div>
      <UserList users={users}/>
    </div>
  );
}

export default page;
