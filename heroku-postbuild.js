#!/usr/bin/env node

// Este arquivo é executado automaticamente pelo Heroku após npm install
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Heroku post-build iniciado...');

try {
  // Garantir que o diretório dist existe
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
    console.log('📁 Diretório dist criado');
  }

  // Build do frontend
  console.log('📦 Executando build do frontend...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Build do backend
  console.log('📦 Executando build do backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node20 --minify', { stdio: 'inherit' });
  
  // Verificar se os arquivos foram criados
  const indexExists = fs.existsSync('dist/index.js');
  const publicExists = fs.existsSync('dist/public');
  
  console.log('📂 Verificação de arquivos:');
  console.log(`   - dist/index.js: ${indexExists ? '✅' : '❌'}`);
  console.log(`   - dist/public: ${publicExists ? '✅' : '❌'}`);
  
  if (!indexExists) {
    throw new Error('ERRO: dist/index.js não foi criado!');
  }
  
  console.log('✅ Build concluído com sucesso!');
  
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}