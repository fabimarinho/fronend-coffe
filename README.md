# Frontend Coffee

Aplicacao web de cafeteria com Next.js, carrinho, checkout e painel administrativo para pedidos.

## Requisitos

- Node.js 20+
- NPM 10+
- PostgreSQL

## Setup local

1. Instale dependencias:

```bash
npm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

3. Ajuste os valores em `.env.local`:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS`

4. Gere cliente Prisma e aplique migracoes:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Rode o projeto:

```bash
npm run dev
```

## Scripts

- `npm run dev`: desenvolvimento
- `npm run build`: build de producao
- `npm run start`: sobe app em modo producao
- `npm run lint`: lint
- `npm run test`: testes
- `npx tsc --noEmit --incremental false`: typecheck isolado

## Arquitetura (resumo)

- App Router: `src/app`
- API de pedidos: `src/app/api/orders/route.ts`
- Atualizacao de status do pedido: `src/app/api/orders/[id]/route.ts`
- Admin UI: `src/app/admin/page.tsx`
- Prisma Client: `src/lib/prisma.ts`
- Auth e autorizacao admin: `src/app/api/auth/[...nextauth]/auth-options.ts`, `src/lib/auth.ts`

## Estado de carrinho

O carrinho esta centralizado em `src/hooks/useCart.ts`.
Componentes devem usar `useCart` em vez de acessar `localStorage` diretamente.

## Checklist de producao

1. Definir variaveis de ambiente no provedor de deploy.
2. Garantir `DATABASE_URL` apontando para banco de producao.
3. Executar migracoes no banco antes do release.
4. Definir pelo menos um e-mail admin em `ADMIN_EMAILS`.
5. Validar `npm run lint`, `npm run test` e `npm run build` no CI.

## Monitoramento de dependencias

- `dependabot.yml`: cria PRs semanais para atualizacao de `npm` e GitHub Actions.
- `dependency-review.yml`: executa semanalmente (`segunda 10:00 UTC`) e pode rodar manualmente.
- A revisao semanal executa:
  - `npm outdated --long`
  - `npm audit --omit=dev --audit-level=moderate`
- O resultado fica em `GitHub Actions > Run > Summary`.

Rotina recomendada:

1. Revisar PRs do Dependabot toda semana.
2. Priorizar PRs com label `security`.
3. Validar pipeline (`lint`, `test`, `build`) antes de merge.
4. Fazer release apos merge de atualizacoes criticas.

## Politica de PR e branch

- `CODEOWNERS` ativo: `.github/CODEOWNERS`
- Template de PR: `.github/pull_request_template.md`
- Guia de branch protection: `.github/BRANCH_PROTECTION.md`

Para fechar o ciclo profissional de release, aplique as regras de protecao da `main` no GitHub conforme o guia.

## Deploy em producao

### Variaveis obrigatorias (todas as plataformas)

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS`

### Ordem exata de migracao e release

1. Garantir backup do banco de producao.
2. Configurar/validar variaveis de ambiente no provedor.
3. Executar migracoes de banco:
   - `npx prisma migrate deploy`
4. Gerar cliente Prisma no processo de build (ja coberto por dependencias instaladas no build).
5. Publicar nova versao da aplicacao.
6. Validar health check funcional:
   - login
   - criacao de pedido
   - atualizacao de status em `/admin`
7. Monitorar logs dos primeiros minutos pos-deploy.

### Checklist por plataforma

#### Vercel

1. Criar projeto e conectar repositorio.
2. Inserir variaveis no painel do projeto (Environment Variables).
3. Definir comando de build padrao (`npm run build`).
4. Rodar migracao de banco via CI/CD ou job manual antes do promote para producao.
5. Validar `NEXTAUTH_URL` com dominio final da Vercel.

#### Railway

1. Provisionar banco PostgreSQL.
2. Configurar servico web com este repositorio.
3. Inserir variaveis no Railway (service variables).
4. Executar `npx prisma migrate deploy` no ambiente de deploy (job/pre-deploy).
5. Publicar e validar logs da aplicacao.

#### Supabase (banco) + provedor de app

1. Criar projeto no Supabase e obter string de conexao PostgreSQL.
2. Configurar `DATABASE_URL` no provedor da aplicacao (Vercel/Railway/outro).
3. Executar `npx prisma migrate deploy` apontando para o banco Supabase.
4. Publicar a aplicacao.
5. Validar conexao com banco e fluxo completo de pedidos.
