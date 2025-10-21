# gitflow-sample

App Node.js mínimo para exercitar Git-Flow.

## Rodar local

```bash
nvm use
cp .env.example .env
npm ci
npm run dev
# http://localhost:3000/health
```

## Testes e Lint

```bash
npm test
npm run lint
npm run lint:fix
npm run prettier:fix
```

## Endpoints

GET /health → { status: "ok", ts: "..." }
GET /version → { name, version } (do package.json)
POST /echo → { received: <body>, env: <ENV_NAME> }

```bash
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"msg":"olá mundo"}'
```

## Docker

```bash
docker build -t node-gitflow-sample:local .
docker run --rm -p 3000:3000 -e ENV_NAME=docker node-gitflow-sample:local
```

## Fluxo Git-Flow (resumo)

* `develop`: linha principal de desenvolvimento.
* `feature/*`: crie a partir de `develop`, depois PR → `develop`.
* `release/*`: estabilização; pode publicar RC em stage; merge final → `main` **e** `develop`.
* `hotfix/*`: parte de `main` para correções urgentes; merge → `main` e `develop`.
* `main`: produção; gere tag `vX.Y.Z`.

## Sugestões de convenções:

* Commits: Conventional Commits
* Versionamento: SemVer
* CI: lint + test em PRs; build/push em `develop`; RC + deploy stage em `release/*`; promoção para prod em `main`.

---

## Como usar para testar o Git-Flow

1. **Init do repo**
```bash
git init
git checkout -b develop
git add .
git commit -m "chore: bootstrap node-gitflow-sample"
```

2. **Feature**
```bash
git checkout -b feature/echo-enhancement
# edite src/routes/echo.js, adicione lógica...
git add .
git commit -m "feat(echo): add headers reflection"
# PR → develop, CI roda (lint/test)
```

3. **Release**
```bash
git checkout -b release/0.2.0
# ajuste version no package.json se quiser
git commit -am "chore(release): prepare 0.2.0"
# push → release/* (build RC e deploy stage, se configurados no seu pipeline)
# PR → main e develop
```

4. **Main/Tag**
```bash
git checkout main
git merge --no-ff release/0.2.0 -m "release: 0.2.0"
git tag v0.2.0
git push origin main --tags
# pipeline de promoção para prod consome digest de RC e marca prod/latest
```

5. **Hotfix**
```bash
git checkout -b hotfix/0.2.1 main
# corrige bug crítico
git commit -am "fix: critical bug"
git checkout main && git merge --no-ff hotfix/0.2.1 -m "hotfix: 0.2.1"
git checkout develop && git merge --no-ff hotfix/0.2.1
git tag v0.2.1 && git push origin main develop --tags
```