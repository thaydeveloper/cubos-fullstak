# 🎬 Teste Cubos - Sistema de Gerenciamento de Filmes

Sistema web para gerenciamento de filmes desenvolvido com React, TypeScript e TailwindCSS.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **TailwindCSS** - Framework CSS utility-first
- **React Router v6** - Roteamento para aplicações React

### UI Components
- **Radix UI** - Componentes acessíveis e customizáveis
  - Dialog, Dropdown Menu, Form, Label, Slot, Switch, Toast, Tooltip, Icons

### Gerenciamento de Estado
- **Zustand** - Gerenciamento de estado global simples e eficiente

### Formulários e Validação
- **React Hook Form** - Biblioteca para formulários performáticos
- **Zod** - Schema validation com TypeScript
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### Estilização
- **class-variance-authority** - Criação de variantes de componentes
- **clsx** - Utilitário para classes CSS condicionais
- **tailwind-merge** - Merge inteligente de classes Tailwind

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **PostCSS** - Processador de CSS
- **Autoprefixer** - Adiciona prefixos CSS automaticamente

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface básicos
│   ├── layout/         # Componentes de layout (Header, Footer, etc.)
│   └── forms/          # Componentes de formulários
├── containers/         # Componentes container (lógica de negócio)
├── pages/             # Páginas da aplicação
├── hooks/             # Custom hooks
├── store/             # Gerenciamento de estado (Zustand)
├── services/          # Serviços de API
├── types/             # Definições de tipos TypeScript
├── utils/             # Funções utilitárias
└── assets/            # Recursos estáticos (imagens, ícones)
```

### Padrão Container/Presentation

O projeto segue o padrão **Container/Presentation** para separar responsabilidades:

- **Presentation Components** (`/components`): Focados na apresentação visual
- **Container Components** (`/containers`): Gerenciam estado e lógica de negócio
- **Pages** (`/pages`): Combinam containers e components para formar páginas completas

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd teste-cubos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173/
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa o ESLint
npm run format       # Formata o código com Prettier
npm run format:check # Verifica se o código está formatado
```

## ⚙️ Configurações

### TailwindCSS
- Configurado com modo dark/light
- Plugin `@tailwindcss/forms` para estilização de formulários
- Fonte personalizada: Inter
- Breakpoints customizados para mobile (414px) e desktop (1366px)

### TypeScript
- Configuração estrita habilitada
- Tipos personalizados para User, Movie, Forms e API
- Integração completa com React e bibliotecas utilizadas

### Prettier
- Configurado para usar aspas simples
- Semicolons obrigatórios
- Trailing commas no estilo ES5
- Largura máxima de 100 caracteres

## 🎯 Funcionalidades Planejadas

- [ ] Sistema de autenticação (Login/Cadastro)
- [ ] Listagem de filmes com busca e filtros
- [ ] Paginação de resultados
- [ ] Detalhes do filme
- [ ] Adicionar/Editar filmes
- [ ] Sistema de tema dark/light
- [ ] Responsividade completa

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando React + TypeScript + TailwindCSS**