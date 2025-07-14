#!/usr/bin/env node

import { build } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Iniciando build para produção...');

// Criar diretório dist se não existir
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

try {
  // Build do frontend com Vite
  console.log('📦 Construindo frontend...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Build do backend com esbuild
  console.log('📦 Construindo backend...');
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    outdir: 'dist',
    external: [
      '@neondatabase/serverless',
      'drizzle-orm',
      'drizzle-zod',
      'express',
      'express-session',
      'connect-pg-simple',
      'memorystore',
      'passport',
      'passport-local',
      'ws',
      'zod',
      'zod-validation-error'
    ],
    minify: true,
    sourcemap: false,
    loader: {
      '.ts': 'ts',
      '.js': 'js'
    }
  });
  
  console.log('✅ Build concluído com sucesso!');
  
  // Verificar se os arquivos foram criados
  const indexExists = fs.existsSync('dist/index.js');
  const publicExists = fs.existsSync('dist/public');
  
  console.log(`📂 Arquivos criados:`);
  console.log(`   - dist/index.js: ${indexExists ? '✅' : '❌'}`);
  console.log(`   - dist/public: ${publicExists ? '✅' : '❌'}`);
  
  if (!indexExists) {
    throw new Error('dist/index.js não foi criado');
  }
  
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}