# 🔧 Solução de Problemas - Heroku Deploy

## Problema Atual: App Crashed (Status 1)

### Causa Provável
O Heroku está falhando ao executar o script de start, provavelmente devido a:
1. Arquivo `dist/index.js` não foi criado corretamente
2. Dependencies de build não estão em `dependencies`
3. Script de build não está sendo executado

### Soluções Implementadas

#### 1. Dependencies Movidas para Production
```bash
# Adicionadas ao dependencies:
- tsx
- esbuild  
- typescript
```

#### 2. Script de Build Customizado
Criado `scripts/build.js` que:
- Executa `vite build` para frontend
- Executa `esbuild` para backend
- Valida se arquivos foram criados
- External dependencies corretas

#### 3. Script de Start Customizado
Criado `scripts/start.js` que:
- Verifica se `dist/index.js` existe
- Configura variáveis de ambiente
- Carrega servidor com tratamento de erros

### Comandos para Corrigir

```bash
# 1. Adicionar scripts ao package.json (necessário)
npm run build  # Teste local do build
npm run start  # Teste local do start

# 2. Commit e push
git add .
git commit -m "Fix: Scripts de build e start customizados"
git push heroku main

# 3. Verificar logs
heroku logs --tail

# 4. Se ainda der erro, forçar rebuild
heroku plugins:install heroku-builds
heroku builds:clear
git push heroku main --force
```

### Verificação do Build Local

```bash
# Teste se o build funciona
npm run build

# Verifique se os arquivos foram criados
ls -la dist/
ls -la dist/public/

# Teste se o start funciona
NODE_ENV=production npm run start
```

### Logs para Monitorar

```bash
# Logs de build
heroku logs --tail --ps build

# Logs de start
heroku logs --tail --ps web

# Logs completos
heroku logs --tail
```

### Configuração Atual

- **Procfile**: `web: node scripts/start.js`
- **Build**: `node scripts/build.js`
- **Start**: `node scripts/start.js`
- **Dependencies**: tsx, esbuild, typescript movidos para production

### Próximos Passos

1. Adicionar scripts ao package.json (NÃO POSSO EDITAR)
2. Fazer commit e push
3. Monitorar logs do Heroku
4. Verificar se aplicação inicia corretamente