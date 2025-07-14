#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🚀 Executando script de release para Heroku...');

try {
  // Configurar database
  console.log('📦 Configurando banco de dados...');
  execSync('npm run db:push', { 
    stdio: 'inherit',
    cwd: projectRoot 
  });
  
  console.log('✅ Release script executado com sucesso!');
} catch (error) {
  console.error('❌ Erro no release script:', error.message);
  process.exit(1);
}