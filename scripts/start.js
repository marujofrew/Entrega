#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🚀 Iniciando aplicação em produção...');

// Verificar se os arquivos necessários existem
const indexPath = join(projectRoot, 'dist', 'index.js');
const publicPath = join(projectRoot, 'dist', 'public');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Erro: dist/index.js não encontrado!');
  console.error('Execute o build primeiro: npm run build');
  process.exit(1);
}

if (!fs.existsSync(publicPath)) {
  console.log('⚠️  Aviso: dist/public não encontrado, mas continuando...');
}

// Configurar variáveis de ambiente
process.env.NODE_ENV = 'production';

console.log('📦 Configurações:');
console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   - PORT: ${process.env.PORT || 5000}`);
console.log(`   - DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Configurado' : '❌ Não configurado'}`);

// Importar e executar o servidor
try {
  console.log('🔄 Carregando servidor...');
  await import(indexPath);
  console.log('✅ Servidor carregado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao carregar servidor:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}