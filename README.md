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

## Pipeline (GitHub Actions)

Tudo em `.github/workflows/ci.yml`, em tres etapas encadeadas:

```
qualidade  ->  docker  ->  deploy
```

1. **qualidade** — `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`.
   Roda em todo push (qualquer branch) e em pull request.
2. **docker** — build da imagem Docker, com cache do proprio Actions.
   So roda se a etapa anterior passar.
3. **deploy** — publica em producao na Vercel. So roda em push na `main`
   e so depois das duas etapas anteriores passarem.

Ou seja: build quebrado nao vira imagem, e imagem quebrada nao vai pro ar.

### Secrets necessarios para o deploy

Cadastre em *Settings > Secrets and variables > Actions*:

| Secret | Onde encontrar |
| --- | --- |
| `VERCEL_TOKEN` | Vercel > Account Settings > Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json`, gerado por `vercel link` |
| `VERCEL_PROJECT_ID` | idem |

Defina tambem `APP_USER` e `APP_PASSWORD` nas Environment Variables do projeto na Vercel.

## Variaveis de ambiente

| Nome | Padrao | Descricao |
| --- | --- | --- |
| `APP_USER` | `admin` | usuario do login |
| `APP_PASSWORD` | `123456` | senha do login |

## Aviso

O login e didatico: compara usuario/senha em texto puro e grava um cookie fixo de sessao.
Nao use como esta em producao real.
