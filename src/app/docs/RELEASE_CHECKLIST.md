# Release Candidate Checklist

## 1. Pre-merge (branch atual)

1. Garantir ambiente com variaveis locais (`.env.local`) valido.
2. Rodar:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
3. Verificar rotas criticas manualmente:
   - `/`
   - `/menu`
   - `/carrinho`
   - `/pagamento`
   - `/admin` (com conta admin)
4. Confirmar que links institucionais funcionam:
   - `/privacidade`
   - `/termos`
   - `/cookies`

## 2. Pre-PR

1. Revisar `git status` e remover arquivos nao desejados.
2. Organizar commit(s) por escopo:
   - `feat(ui): ...`
   - `feat(admin): ...`
   - `chore(release): ...`
3. Abrir PR com template e preencher:
   - impacto visual
   - risco
   - plano de validacao

## 3. Merge gate

1. Exigir CI verde:
   - lint
   - test
   - build
2. Exigir review conforme `CODEOWNERS`.
3. Merge apenas apos checks obrigatorios.

## 4. Deploy (ordem exata)

1. Backup do banco de producao.
2. Confirmar variaveis no provedor:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `ADMIN_EMAILS`
3. Executar migracoes:
   - `npx prisma migrate deploy`
4. Publicar aplicacao.
5. Smoke test pos-deploy:
   - login via Google
   - adicionar produto ao carrinho
   - finalizar pedido
   - atualizar status do pedido no `/admin`

## 5. Pos-deploy (primeiros 30 min)

1. Monitorar logs de API/auth/orders.
2. Confirmar ausencia de erro 500 nas rotas principais.
3. Validar tempo de resposta geral.

## 6. Rollback rapido

1. Reverter deploy para versao anterior no provedor.
2. Se migracao nao retrocompativel foi aplicada, executar plano de contingencia do banco antes do rollback de app.
3. Comunicar status e causa raiz no PR/incidente.
