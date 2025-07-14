# 🔧 Comandos Git para Deploy

## Execute estes comandos no seu terminal:

```bash
# 1. Adicionar todos os arquivos alterados
git add .

# 2. Fazer commit das mudanças
git commit -m "Add serve dependency and fix Heroku deploy configuration

- Add serve v14.2.4 for static file serving
- Move build tools to production dependencies
- Update Procfile: npm run build && npm run start
- Add deployment documentation and troubleshooting guides"

# 3. Push para Heroku
git push heroku main

# 4. Monitorar logs do deploy
heroku logs --tail
```

## Arquivos modificados neste commit:

✅ **Procfile** - Atualizado para executar build + start
✅ **package.json** - Adicionado serve como dependência
✅ **heroku-postbuild.js** - Script de build automático
✅ **scripts/build.js** - Build customizado com validação
✅ **scripts/start.js** - Start com debugging
✅ **DEPLOY_UPDATED.md** - Instruções atualizadas
✅ **DEPENDENCIES_UPDATE.md** - Documentação de dependências
✅ **HEROKU_FIX_INSTRUCTIONS.md** - Guia de correção
✅ **HEROKU_TROUBLESHOOTING.md** - Solução de problemas

## O que vai acontecer no deploy:

1. **Heroku instala dependencies** (incluindo serve, tsx, esbuild, vite)
2. **Executa npm run build** (cria dist/index.js e dist/public/)
3. **Executa npm run start** (inicia servidor em produção)
4. **Aplicação roda** na porta do Heroku

## Se der algum erro:

```bash
# Ver logs detalhados
heroku logs --tail

# Forçar rebuild se necessário
git push heroku main --force
```

Execute os comandos acima para fazer o deploy!