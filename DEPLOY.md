# Guia de Deploy na Heroku

## Preparação do Projeto

✅ **Arquivos criados para deploy:**
- `Procfile` - Configuração do processo web
- `app.json` - Configuração da aplicação
- `.nvmrc` - Versão do Node.js
- `scripts/heroku-release.js` - Script de inicialização
- `README.md` - Documentação
- `.gitignore` - Arquivos ignorados

## Passo a Passo

### 1. Preparar repositório Git

```bash
# Inicializar repositório (se não existir)
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Preparação para deploy na Heroku"
```

### 2. Instalar Heroku CLI

```bash
# macOS
brew install heroku/brew/heroku

# Ubuntu/Debian
sudo snap install heroku --classic

# Windows
# Baixar de https://devcenter.heroku.com/articles/heroku-cli
```

### 3. Login na Heroku

```bash
heroku login
```

### 4. Criar aplicação na Heroku

```bash
# Criar nova aplicação
heroku create correios-tracking-app

# Ou usar nome específico
heroku create seu-nome-app
```

### 5. Adicionar PostgreSQL

```bash
heroku addons:create heroku-postgresql:essential-0
```

### 6. Configurar variáveis de ambiente

```bash
# Definir ambiente de produção
heroku config:set NODE_ENV=production

# Verificar DATABASE_URL (deve ser configurado automaticamente)
heroku config:get DATABASE_URL
```

### 7. Deploy

```bash
# Fazer deploy
git push heroku main

# Ou se estiver em branch diferente
git push heroku sua-branch:main
```

### 8. Verificar logs

```bash
# Ver logs em tempo real
heroku logs --tail

# Ver logs específicos
heroku logs --dyno web
```

## Deploy com Um Clique

Para deploy automático, use o botão abaixo:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Comandos Úteis

```bash
# Reiniciar aplicação
heroku restart

# Executar comando no servidor
heroku run npm run db:push

# Abrir aplicação no navegador
heroku open

# Ver informações da aplicação
heroku info

# Escalar dynos
heroku ps:scale web=1

# Ver status
heroku ps
```

## Solução de Problemas

### Build falha

```bash
# Verificar logs de build
heroku logs --tail

# Limpar cache de build
heroku plugins:install heroku-builds
heroku builds:clear
```

### Problemas de banco de dados

```bash
# Verificar conexão
heroku pg:info

# Executar migrations
heroku run npm run db:push

# Resetar banco (CUIDADO!)
heroku pg:reset DATABASE_URL
```

### Problemas de porta

- O servidor está configurado para usar `process.env.PORT`
- Heroku atribui porta automaticamente
- Não é necessário configurar manualmente

## Estrutura de Produção

```
dist/
├── public/          # Assets do frontend
├── index.js         # Servidor Express compilado
└── assets/          # CSS, JS bundled
```

## Configurações Importantes

- **Node.js**: Versão 20.18.1 (definida em `.nvmrc`)
- **Build**: Executado automaticamente via `npm run build`
- **Database**: PostgreSQL configurado automaticamente
- **Porta**: Dinâmica via `process.env.PORT`
- **Logs**: Habilitados para debug

## Monitoramento

```bash
# Métricas da aplicação
heroku logs --tail | grep "serving on port"

# Status dos dynos
heroku ps

# Uso de recursos
heroku logs --tail | grep "memory"
```

## Backup

```bash
# Backup do banco
heroku pg:backups:capture

# Listar backups
heroku pg:backups

# Restaurar backup
heroku pg:backups:restore BACKUP_ID
```