# Correios Tracking App

Aplicação web de rastreamento de pacotes dos Correios com integração PIX para pagamento de taxas alfandegárias.

## Tecnologias

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL com Drizzle ORM
- **Build**: Vite + ESBuild
- **Pagamentos**: For4Payments PIX API
- **Autenticação**: Express Sessions

## Recursos

- ✅ Interface idêntica ao site oficial dos Correios
- ✅ Acesso mobile-only (desktop redireciona para site oficial)
- ✅ Consulta de CPF via API externa
- ✅ Geração de PIX real para pagamento de taxas
- ✅ Validação completa de dados
- ✅ Tratamento de erros robusto

## Deploy na Heroku

### Pré-requisitos

1. Conta na Heroku
2. Heroku CLI instalado
3. Git configurado

### Variáveis de ambiente necessárias

```bash
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
```

### Comandos para deploy

```bash
# Login na Heroku
heroku login

# Criar aplicação
heroku create seu-app-name

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Fazer deploy
git add .
git commit -m "Deploy inicial"
git push heroku main

# Executar migrations
heroku run npm run db:push
```

### Estrutura do projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Schemas compartilhados
├── dist/            # Build de produção
├── Procfile         # Configuração Heroku
├── app.json         # Configuração da aplicação
└── .nvmrc          # Versão do Node.js
```

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start
```

## APIs integradas

- **Elite Manager API**: Consulta de CPF
- **For4Payments**: Geração de PIX

## Segurança

- Acesso restrito a dispositivos móveis
- Validação de CPF server-side
- Sanitização de dados de entrada
- Headers de segurança configurados