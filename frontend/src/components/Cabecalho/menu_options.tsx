export type Menu = {
  id: string;
  menu_title: "Pedidos" | "Orçamentos" | "Clientes" | "Produtos" | "Usuários";
  options: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}[];

const getOptions = (menu: Menu, title: Menu[0]["menu_title"]) => {
  const secao = menu.filter((secao) => secao.menu_title === title);

  return secao[0].options;
};

export const menu_user: Menu = [
  {
    id: "pedido",
    menu_title: "Pedidos",
    options: [
      {
        title: "Meus Pedidos",
        href: "/pedido/meus-pedidos",
        description: "Visualize seus pedidos",
      },
      {
        title: "Novo Pedido",
        href: "/pedido/novo-pedido",
        description: "Faça um novo pedido",
      },
    ],
  },
  {
    id: "orcamento",
    menu_title: "Orçamentos",
    options: [
      {
        title: "Meus Orçamentos",
        href: "/orcamento/meus-orcamentos",
        description: "Visualize seus orçamentos",
      },
      {
        title: "Novo Orçamento",
        href: "/orcamento/novo-orcamento",
        description: "Faça um novo orçamento",
      },
    ],
  },
  {
    id: "liente",
    menu_title: "Clientes",
    options: [
      {
        title: "Meus Clientes",
        href: "/cliente/meus-clientes",
        description: "Visualize seus clientes",
      },
      {
        title: "Novo Cliente",
        href: "/cliente/novo-cliente",
        description: "Cadastre um novo cliente",
      },
    ],
  },
  {
    id: "produto",
    menu_title: "Produtos",
    options: [
      {
        title: "Todos os Produtos",
        href: "/produto/todos-produtos",
        description: "Visualize todos os produtos",
      },
    ],
  },
];

export const menu_adm: Menu = [
  {
    id: "pedido",
    menu_title: "Pedidos",
    options: [
      {
        title: "Todos os Pedidos",
        href: "/pedido/todos-pedidos",
        description: "Visualize todos os pedidos",
      },
      ...getOptions(menu_user, "Pedidos"),
    ],
  },
  {
    id: "orcamento",
    menu_title: "Orçamentos",
    options: [
      {
        title: "Todos os Orçamentos",
        href: "/orcamento/todos-orcamentos",
        description: "Visualize todos os orçamentos",
      },
      ...getOptions(menu_user, "Orçamentos"),
    ],
  },
  {
    id: "cliente",
    menu_title: "Clientes",
    options: [
      {
        title: "Todos os Clientes",
        href: "/cliente/todos-clientes",
        description: "Visualize todos os clientes",
      },
      ...getOptions(menu_user, "Clientes"),
    ],
  },
  {
    id: "produto",
    menu_title: "Produtos",
    options: [
      ...getOptions(menu_user, "Produtos"),
      {
        title: "Novo Produto",
        href: "/produto/novo-produto",
        description: "Cadastre um novo produto",
      },
      {
        title: "Tabela de Produtos",
        href: "/produto/todos-detalhes",
        description: "Tabela de produtos e detalhes",
      },
    ],
  },
  {
    id: "usuario",
    menu_title: "Usuários",
    options: [
      {
        title: "Todos Usuários",
        href: "/usuario/todos-usuarios",
        description: "Visualize todos os usuários",
      },
      {
        title: "Novo Usuário",
        href: "/usuario/novo-usuario",
        description: "Cadastre um novo usuário",
      },
    ],
  },
];

export const menu_dev: Menu = [...menu_adm];
