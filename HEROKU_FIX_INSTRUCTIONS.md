# 🔧 Instruções para Corrigir o Deploy no Heroku

## Problema Identificado
O Heroku está falhando porque o script `npm start` não consegue encontrar o arquivo `dist/index.js` ou o build não está sendo executado corretamente.

## Solução Rápida

### 1. Adicione estes scripts ao package.json:

**IMPORTANTE**: Você precisa adicionar manualmente estas linhas no `package.json`:

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node20 --minify",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push",
    "heroku-postbuild": "node heroku-postbuild.js"
  }
}
```

### 2. Faça o commit e push:

```bash
git add .
git commit -m "Fix: Add heroku-postbuild script"
git push heroku main
```

### 3. Monitorar o deploy:

```bash
heroku logs --tail
```

## Arquivos Criados para Ajudar

✅ **heroku-postbuild.js** - Script automático de build
✅ **scripts/build.js** - Script de build customizado
✅ **scripts/start.js** - Script de start com debugging
✅ **HEROKU_TROUBLESHOOTING.md** - Guia de solução de problemas

## Se Ainda Não Funcionar

### Opção 1: Usar script direto no Procfile
```
web: node heroku-postbuild.js && node dist/index.js
```

### Opção 2: Build manual
```bash
# Limpar cache
heroku plugins:install heroku-builds
heroku builds:clear

# Forçar rebuild
git push heroku main --force
```

### Opção 3: Verificar dependências
```bash
# Verificar se tsx, esbuild, typescript estão em dependencies
heroku run npm list tsx esbuild typescript
```

## Logs para Debugar

```bash
# Logs de build
heroku logs --tail --ps build

# Logs de aplicação
heroku logs --tail --ps web

# Logs completos
heroku logs --tail
```

## Testando Local

```bash
# Testar build
npm run build

# Verificar arquivos
ls -la dist/

# Testar start
NODE_ENV=production npm start
```

## Resumo da Solução

1. **Adicionar heroku-postbuild** ao package.json
2. **Commit e push**
3. **Monitorar logs**
4. **Verificar se dist/index.js foi criado**

O problema principal é que o Heroku não está executando o build automaticamente. Com o script `heroku-postbuild`, ele vai executar o build após instalar as dependências.