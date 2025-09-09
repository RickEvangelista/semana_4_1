//userListCard
"use client";

import Button from "@/components/Button";
import CardItem from "@/components/CardItem";
import Link from "next/link";
import { useState } from "react";
import deleteUser from "../action/deleteUser";
import { UserListItem } from "@/types/user";
import Input from "@/components/Input";

interface UserListProps {
  users: UserListItem[];
}

export default function UserList({ users }: UserListProps) {
  const [modalUser, setModalUser] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const handleDeleteClick = (id_usuario: number) => {
    setModalUser(id_usuario);
  };

  const handleConfirmDelete = async () => {
    if (modalUser === null) return;

    const result = await deleteUser(modalUser);
    setModalUser(null);
  };

  const handleCancelDelete = () => {
    setModalUser(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      u.perfil.titulo.toLocaleLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <Input
        label={""}
        name={"filtros"}
        placeholder="Filtre por usuário ou nome"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p className="text-center text-dark-gray">Nenhum usuário encontrado</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((usuario) => (
            <div key={usuario.id_usuario}>
              <CardItem
                title={usuario.nome_completo}
                content={
                  <>
                    <p>{usuario.email}</p>
                    <p>{usuario.perfil.titulo}</p>
                    <p>{usuario.id_usuario}</p>
                  </>
                }
                actions={
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/dashboard/usuarios/${usuario.id_usuario}/editar`}
                      className={"text-custom-blue hover:underline"}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      className={"w-1/2"}
                      onClick={() => handleDeleteClick(usuario.id_usuario)}
                    >
                      Deletar
                    </Button>
                  </div>
                }
                borderColor="border-custom-blue"
              />
            </div>
          ))}
        </div>
      )}

      {modalUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl text-center font-semibold mb-4">
              Confirmar exclusão
            </h2>
            <p className="mb-6">
              Tem certeza que deseja deletar este usuário? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                className={"w-1/2"}
                onClick={handleCancelDelete}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                className={"w-1/2"}
                onClick={handleConfirmDelete}
              >
                Deletar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
