# Frontend Coffee - E-commerce de Cafeteria

![Versão](https://img.shields.io/badge/versão-2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.12.0-green)

Um e-commerce completo para cafeteria, com sistema de autenticação, carrinho de compras, checkout e gerenciamento de pedidos.

## 🚀 Funcionalidades

- ✅ **Autenticação segura** com NextAuth.js e bcrypt
- ✅ **Catálogo de produtos** com filtros e busca
- ✅ **Carrinho de compras** persistente
- ✅ **Checkout completo** com múltiplos métodos de pagamento
- ✅ **Gerenciamento de pedidos** com histórico e status
- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Performance otimizada** com Next.js 15

## 📋 Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/frontend-coffee.git
cd frontend-coffee
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas configurações.

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🛠️ Tecnologias

- **Frontend**: Next.js, React, TypeScript
- **Estilização**: SCSS Modules
- **Autenticação**: NextAuth.js, bcrypt
- **Banco de Dados**: Prisma ORM, SQLite (dev)
- **Validação**: Zod Schema Validation
- **UI/UX**: React Icons, React Toastify

## 📦 Estrutura do Projeto

```
frontend-coffee/
├── prisma/               # Schema e migrações do banco de dados
├── public/               # Arquivos estáticos
├── src/
│   ├── app/              # Rotas e componentes de página (App Router)
│   │   ├── api/          # Rotas de API
│   │   ├── components/   # Componentes específicos de página
│   │   └── ...           # Páginas da aplicação
│   ├── components/       # Componentes compartilhados
│   ├── context/          # Contextos React
│   ├── data/             # Dados estáticos e mocks
│   ├── hooks/            # Hooks customizados
│   ├── lib/              # Utilitários e configurações
│   └── types/            # Definições de tipos TypeScript
├── .env.local            # Variáveis de ambiente locais
├── next.config.ts        # Configuração do Next.js
└── package.json          # Dependências e scripts
```

## 🔒 Segurança

- Autenticação segura com NextAuth.js
- Senhas armazenadas com hash bcrypt
- Validação de entrada com Zod
- Headers de segurança HTTP configurados
- Proteção contra CSRF e XSS

## 📱 Responsividade

A aplicação é totalmente responsiva e testada nos seguintes dispositivos:

- Smartphones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Telas grandes (1440px+)

## 🚀 Deploy

Para build de produção:

```bash
npm run build
# ou
yarn build
```

Para iniciar em produção:

```bash
npm start
# ou
yarn start
```

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ por Fabiane

