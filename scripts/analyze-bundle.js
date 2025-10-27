#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Bundle Size Analysis\n');
console.log('=' .repeat(60));

// Get all JS files in the build output
const chunksDir = path.join(__dirname, '../out/_next/static/chunks');

if (!fs.existsSync(chunksDir)) {
  console.error('❌ Build output not found. Please run "npm run build" first.');
  process.exit(1);
}

const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));

let totalSize = 0;
let totalGzipSize = 0;

const fileSizes = files.map(file => {
  const filePath = path.join(chunksDir, file);
  const stats = fs.statSync(filePath);
  const size = stats.size;
  
  // Get gzipped size
  const gzipSize = execSync(`gzip -c "${filePath}" | wc -c`, { encoding: 'utf-8' });
  const gzipSizeNum = parseInt(gzipSize.trim());
  
  totalSize += size;
  totalGzipSize += gzipSizeNum;
  
  return {
    file,
    size,
    gzipSize: gzipSizeNum,
    sizeKB: (size / 1024).toFixed(2),
    gzipSizeKB: (gzipSizeNum / 1024).toFixed(2),
  };
});

// Sort by gzip size descending
fileSizes.sort((a, b) => b.gzipSize - a.gzipSize);

console.log('\n📦 Individual Chunk Sizes:\n');
fileSizes.forEach((item, index) => {
  const bar = '█'.repeat(Math.ceil(item.gzipSize / totalGzipSize * 40));
  console.log(`${index + 1}. ${item.file}`);
  console.log(`   Size: ${item.sizeKB} KB | Gzipped: ${item.gzipSizeKB} KB`);
  console.log(`   ${bar}\n`);
});

console.log('=' .repeat(60));
console.log(`\n📊 Total Bundle Size:`);
console.log(`   Uncompressed: ${(totalSize / 1024).toFixed(2)} KB`);
console.log(`   Gzipped: ${(totalGzipSize / 1024).toFixed(2)} KB`);

const targetSize = 200; // KB
const status = totalGzipSize / 1024 < targetSize ? '✅' : '⚠️';
console.log(`\n${status} Target: < ${targetSize} KB (gzipped)`);

if (totalGzipSize / 1024 > targetSize) {
  console.log('\n💡 Optimization Suggestions:');
  console.log('   1. Use dynamic imports for heavy components');
  console.log('   2. Import specific icons instead of entire icon library');
  console.log('   3. Consider lighter alternatives for animation libraries');
  console.log('   4. Enable tree shaking for unused code');
}

console.log('\n' + '='.repeat(60) + '\n');
