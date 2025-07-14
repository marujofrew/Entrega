# 🚀 Instruções de Deploy na Heroku

## Arquivos Configurados

✅ **Procfile** - Define comando `npm start`
✅ **app.json** - Configuração completa da aplicação
✅ **.nvmrc** - Node.js versão 20.18.1
✅ **package.json** - Scripts de build e start configurados
✅ **servidor** - Porta dinâmica para Heroku (`process.env.PORT`)

## Comandos para Deploy

### 1. Preparar Git (se necessário)
```bash
git init
git add .
git commit -m "Deploy inicial"
```

### 2. Criar app na Heroku
```bash
heroku create seu-nome-app
```

### 3. Adicionar PostgreSQL
```bash
heroku addons:create heroku-postgresql:essential-0
```

### 4. Deploy
```bash
git push heroku main
```

### 5. Verificar
```bash
heroku open
heroku logs --tail
```

## O que acontece no Deploy

1. **Heroku detecta Node.js** (via package.json)
2. **Instala dependências** (`npm install`)
3. **Executa build** (`npm run build`)
4. **Inicia servidor** (`npm start`)
5. **Configura PostgreSQL** (automaticamente)

## Variáveis de Ambiente

✅ **DATABASE_URL** - Configurado automaticamente pelo PostgreSQL addon
✅ **NODE_ENV** - Definido como "production"
✅ **PORT** - Fornecido automaticamente pelo Heroku

## Estrutura Final

```
seu-app.herokuapp.com/
├── Frontend React (build otimizado)
├── Backend Express (API + páginas)
├── PostgreSQL (banco de dados)
└── Logs (heroku logs --tail)
```

## Pronto para Deploy! 🎉

Seu projeto está 100% configurado para Heroku com:
- Build automático
- PostgreSQL integrado
- Porta dinâmica
- Logs habilitados
- Configuração de produção