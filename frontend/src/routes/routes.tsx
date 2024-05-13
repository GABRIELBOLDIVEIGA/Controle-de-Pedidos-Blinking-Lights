import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { MeusOrcamentos } from "@/pages/Private/Orcamentos/MeusOrcamentos";
import { ClientesDoUsuario } from "@/pages/Private/Clientes/ClientesDoUsuario/ClientesDoUsuario";
import { CadastrarCliente } from "@/pages/Private/Clientes/CadastrarCliente/CadastrarCliente";
import { Login } from "@/pages/Public/Login/Login";
import { EditarCliente } from "@/pages/Private/Clientes/EditarCliente/EditarCliente";
import { PedidosDoUsuario } from "@/pages/Private/Pedidos/PedidosDoUsuario/PedidosDoUsuario";
import { TodosOsClientes } from "@/pages/Private/Clientes/TodosOsClientes/TodosOsClientes";

import { PrivateRoutes } from "@/routes/PrivateRoutes";
import { CardEsqueciMinhaSenha } from "@/pages/Public/CardEsqueciMinhaSenha/CardEsqueciMinhaSenha";
import { TodosOsProdutos } from "@/pages/Private/Produtos/TodosOsProdutos/TodosOsProdutos";
import { CadastrarUsuario } from "@/pages/Private/Usuarios/CadastrarUsuario/CadastrarUsuario";
import { EditarUsuario } from "@/pages/Private/Usuarios/EditarUsuario/EditarUsuario";
import { TodosUsuarios } from "@/pages/Private/Usuarios/TodosUsuarios/TodosUsuarios";
import { Perfil } from "@/pages/Private/Usuarios/Pefil/Perfil";
import { NovoPedido } from "@/pages/Private/Pedidos/NovoPedido/NovoPedido";
import { TodosOrcamentos } from "@/pages/Private/Orcamentos/TodosOrcamentos";
import { TodosPedidos } from "@/pages/Private/Pedidos/TodosPedidos/TodosPedidos";
import { NovoOrcamento } from "@/pages/Private/Orcamentos/NovoOrcamento/NovoOrcamento";
import { TodosProdutosAdmin } from "@/pages/Private/Produtos/admin/TodosProdutos/TodosProdutos";
import { CadastrarProduto } from "@/pages/Private/Produtos/admin/CadastrarProduto/CadastrarProduto";
import { EditarProduto } from "@/pages/Private/Produtos/admin/EditarProduto/EditarProduto";
import { PedidoPDF } from "@/pages/Private/Pedidos/PedidoPDF/PedidoPDF";
import { EditarPedidoOrcamento } from "@/pages/Private/Editar-Pedido-Orcamento/EditarPedidoOrcamento";
import { ErrorPage } from "@/pages/Public/404";
import { Configuracoes } from "@/pages/Private/Configuracoes/Configuracoes";
// import { DEVRoutes } from "./DEV-Routes";
// import { Teste } from "@/pages/teste/teste";

export const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
            children: [
              {
                path: "/login/esqueci-minha-senha",
                element: <CardEsqueciMinhaSenha />,
              },
            ],
          },
        ],
      },
    ],
  },

  // {
  //   path: "/dev",
  //   element: <DEVRoutes />,
  //   children: [
  //     {
  //       path: "/dev/teste",
  //       element: <Teste />,
  //     },
  //   ],
  // },

  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/pedido",
        children: [
          {
            path: "/pedido/meus-pedidos",
            element: <PedidosDoUsuario />,
          },
          {
            path: "/pedido/novo-pedido",
            element: <NovoPedido />,
          },
          {
            path: "/pedido/todos-pedidos",
            element: <TodosPedidos />,
          },
          {
            path: "/pedido/:id",
            element: <EditarPedidoOrcamento />,
          },
          {
            path: "/pedido/pdf/:id",
            element: <PedidoPDF />,
          },
        ],
      },

      {
        path: "/orcamento",
        children: [
          {
            path: "/orcamento/meus-orcamentos",
            element: <MeusOrcamentos />,
          },
          {
            path: "/orcamento/novo-orcamento",
            element: <NovoOrcamento />,
          },
          {
            path: "/orcamento/todos-orcamentos",
            element: <TodosOrcamentos />,
          },
        ],
      },

      {
        path: "/cliente",
        children: [
          {
            path: "/cliente/meus-clientes",
            element: <ClientesDoUsuario />,
          },
          {
            path: "/cliente/novo-cliente",
            element: <CadastrarCliente />,
          },
          {
            path: "/cliente/atualizar/:id",
            element: <EditarCliente />,
          },
          {
            path: "/cliente/todos-clientes",
            element: <TodosOsClientes />,
          },
        ],
      },

      {
        path: "/produto",
        children: [
          {
            path: "/produto/todos-produtos",
            element: <TodosOsProdutos />,
          },
          {
            path: "/produto/novo-produto",
            element: <CadastrarProduto />,
          },
          {
            path: "/produto/todos-detalhes",
            element: <TodosProdutosAdmin />,
          },
          {
            path: "/produto/atualizar/:id",
            element: <EditarProduto />,
          },
        ],
      },

      {
        path: "/usuario",
        children: [
          {
            path: "/usuario/todos-usuarios",
            element: <TodosUsuarios />,
          },
          {
            path: "/usuario/novo-usuario",
            element: <CadastrarUsuario />,
          },
          {
            path: "/usuario/atualizar/:id",
            element: <EditarUsuario />,
          },
          {
            path: "/usuario/perfil",
            element: <Perfil />,
          },
        ],
      },
    ],
  },
]);
