# Branch Protection (GitHub)

Aplicar em `Settings > Branches > Add rule` para `main`.

## Regras recomendadas

1. `Require a pull request before merging`
2. `Require approvals`: 1 (ou 2 para time maior)
3. `Dismiss stale pull request approvals when new commits are pushed`
4. `Require review from Code Owners`
5. `Require status checks to pass before merging`
6. Checks obrigatorios:
   - `build` (workflow CI)
7. `Require branches to be up to date before merging`
8. `Require conversation resolution before merging`
9. `Do not allow bypassing the above settings`
10. `Restrict pushes that create files` (se disponivel no plano da conta)

## Fluxo esperado

1. Abrir PR para `main`
2. CI verde (`lint`, `test`, `build`)
3. Review aprovado por code owner
4. Merge
