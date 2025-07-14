# 📦 Dependências Atualizadas para Heroku

## Dependências Adicionadas

### serve (v14.2.4)
- **Função**: Servir arquivos estáticos em produção
- **Local**: dependencies (production)
- **Uso**: Alternativa ao express para servir build do frontend

### Dependencies Movidas para Production

Estas dependências foram movidas de devDependencies para dependencies:
- **tsx**: Executar TypeScript diretamente
- **esbuild**: Bundler para build do backend
- **typescript**: Compilador TypeScript

## Por que essas mudanças?

### Problema Original
O Heroku por padrão não instala `devDependencies` em produção, então:
- `vite build` falhava (vite em devDependencies)
- `esbuild` falhava (esbuild em devDependencies)
- `tsx` não disponível para scripts

### Solução Implementada
- **serve**: Para servir arquivos estáticos se necessário
- **Build tools em production**: Permite executar build no Heroku
- **Procfile atualizado**: `npm run build && npm run start`

## Configuração Atual

### Procfile
```
web: npm run build && npm run start
```

### Scripts no package.json
```json
{
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js"
}
```

### Dependencies de Build
```json
{
  "dependencies": {
    "serve": "^14.2.4",
    "tsx": "^4.20.3",
    "esbuild": "^0.25.6",
    "typescript": "^5.6.3"
  }
}
```

## Próximo Deploy

Agora que as dependências estão corretas:

```bash
git add .
git commit -m "Add serve and move build tools to dependencies"
git push heroku main
```

O Heroku vai:
1. Instalar todas as dependencies (incluindo build tools)
2. Executar `npm run build` (agora vai funcionar)
3. Executar `npm run start` (vai encontrar dist/index.js)

## Alternativas de Uso

### Opção 1: Express serving (atual)
- Express serve tanto API quanto arquivos estáticos
- Configurado em `server/vite.ts`

### Opção 2: Serve apenas arquivos estáticos
```bash
# Para usar apenas serve (se necessário)
serve dist/public -s -p $PORT
```

## Resultado Esperado

✅ **Build vai funcionar** - todas as ferramentas disponíveis
✅ **Start vai funcionar** - dist/index.js será criado
✅ **App vai rodar** - sem crash no Heroku