# Projeto Simples — Clima

App Next.js bem enxuto: login simples e consulta de clima por cidade.
O foco do projeto e o fluxo de trabalho — versionamento no Git, CI no GitHub Actions,
imagem Docker e deploy na Vercel.

## Como funciona

- `/` — tela de login (usuario e senha vindos de variaveis de ambiente).
- `/dashboard` — busca o clima atual da cidade digitada. Protegido por middleware.
- API de clima: [Open-Meteo](https://open-meteo.com) (publica, sem chave).

Credenciais padrao: `admin` / `123456` (ajuste em `.env.local` ou nas variaveis do deploy).

## Rodando local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse http://localhost:3000

## Rodando com Docker

```bash
docker compose up --build
```

Ou direto:

```bash
docker build -t projeto-simples . && docker run -p 3000:3000 projeto-simples
```

## CI (GitHub Actions)

`.github/workflows/ci.yml` roda em todo push e pull request:

1. `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`
2. build da imagem Docker (com cache do Actions)

## Deploy na Vercel

`.github/workflows/deploy.yml` publica em producao a cada push na `main`.
Antes de usar, crie o projeto na Vercel e cadastre os secrets no repositorio
(Settings > Secrets and variables > Actions):

| Secret | Onde encontrar |
| --- | --- |
| `VERCEL_TOKEN` | Vercel > Account Settings > Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` apos rodar `vercel link` |
| `VERCEL_PROJECT_ID` | idem |

Defina tambem `APP_USER` e `APP_PASSWORD` nas Environment Variables do projeto na Vercel.

> Se preferir, a integracao nativa Vercel + GitHub ja faz o deploy automatico;
> nesse caso o workflow de deploy pode ser removido.

## Variaveis de ambiente

| Nome | Padrao | Descricao |
| --- | --- | --- |
| `APP_USER` | `admin` | usuario do login |
| `APP_PASSWORD` | `123456` | senha do login |

## Aviso

O login e didatico: compara usuario/senha em texto puro e grava um cookie fixo de sessao.
Nao use como esta em producao real.
