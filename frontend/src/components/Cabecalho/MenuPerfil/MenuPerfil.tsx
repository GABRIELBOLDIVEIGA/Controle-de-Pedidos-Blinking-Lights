import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { Avatar } from "@/components/Avatar/Avatar";
import {
  LogOut,
  UserRoundCog,
  ScrollText,
  Scroll,
  CircleFadingPlus,
  BookUser,
  Contact,
  UserPlus,
  ShoppingBasket,
  Table,
  PackagePlus,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const MenuPerfil = () => {
  const { user, singout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="pr-2" size="icon">
          <Avatar src={user?.avatar} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 mt-2 w-56 mobile:mr-5 mobile:w-40">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/usuario/perfil">
            <DropdownMenuItem>
              Perfil
              <DropdownMenuShortcut>
                <UserRoundCog size={14} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          {/* <DropdownMenuItem disabled>
            Segurança
            <DropdownMenuShortcut>
              <ShieldCheck size={14} />
            </DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Pedidos</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link to="/pedido/novo-pedido">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Novo Pedido</p>
                    <DropdownMenuShortcut>
                      <CircleFadingPlus size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                <Link to="/pedido/meus-pedidos">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Meus Pedidos</p>
                    <DropdownMenuShortcut>
                      <ScrollText size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
                  <Link to="/pedido/todos-pedidos">
                    <DropdownMenuItem className="flex justify-between gap-4">
                      <p>Todos Pedidos</p>
                      <DropdownMenuShortcut>
                        <Scroll size={14} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Orçamentos</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link to="/orcamento/novo-orcamento">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Novo Orçamento</p>
                    <DropdownMenuShortcut>
                      <CircleFadingPlus size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                <Link to="/orcamento/meus-orcamentos">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Meus Orçamentos</p>
                    <DropdownMenuShortcut>
                      <ScrollText size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
                  <Link to="/orcamento/todos-orcamentos">
                    <DropdownMenuItem className="flex justify-between gap-4">
                      <p>Todos Orçamentos</p>
                      <DropdownMenuShortcut>
                        <Scroll size={14} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Clientes</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link to="/cliente/novo-cliente">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Novo Cliente</p>
                    <DropdownMenuShortcut>
                      <UserPlus size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                <Link to="/cliente/meus-clientes">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Meus Clientes</p>
                    <DropdownMenuShortcut>
                      <Contact size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
                  <Link to="/cliente/todos-clientes">
                    <DropdownMenuItem className="flex justify-between gap-4">
                      <p>Todos Clientes</p>
                      <DropdownMenuShortcut>
                        <BookUser size={14} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Produtos</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link to="/produto/todos-produtos">
                  <DropdownMenuItem className="flex justify-between gap-4">
                    <p>Todos Produtos</p>
                    <DropdownMenuShortcut>
                      <ShoppingBasket size={14} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
                  <>
                    <Link to="/produto/todos-detalhes">
                      <DropdownMenuItem className="flex justify-between gap-4">
                        <p>Tabela de Produtos</p>
                        <DropdownMenuShortcut>
                          <Table size={14} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/produto/novo-produto">
                      <DropdownMenuItem className="flex justify-between gap-4">
                        <p>Novo Produto</p>
                        <DropdownMenuShortcut>
                          <PackagePlus size={14} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Usuários</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <Link to="/usuario/novo-usuario">
                      <DropdownMenuItem className="flex justify-between gap-4">
                        <p>Novo Usuário</p>
                        <DropdownMenuShortcut>
                          <CircleFadingPlus size={14} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>

                    <Link to="/usuario/todos-usuarios">
                      <DropdownMenuItem className="flex justify-between gap-4">
                        <p>Todos Usuários</p>
                        <DropdownMenuShortcut>
                          <ScrollText size={14} />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </>
        )}

        {(user?.permissao === "ADM" || user?.permissao === "DEV") && (
          <>
            <DropdownMenuSeparator />
            <Link to="/configuracoes">
              <DropdownMenuItem className="flex justify-between">
                <p>Configurações</p>
                <Settings size={14} />
              </DropdownMenuItem>
            </Link>
          </>
        )}

        {/* <DropdownMenuItem disabled>
          GitHub
          <DropdownMenuShortcut>
            <TerminalSquare size={14} />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}

        {/* <DropdownMenuItem disabled>
          Supporte
          <DropdownMenuShortcut>
            <MessageCircleQuestion size={14} />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => {
            singout();
            navigate("/login");
          }}
        >
          <p>Sair</p>
          <LogOut size={14} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
