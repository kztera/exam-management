#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs';

console.log('🚀 Monitoring Vite Dev Server Performance...\n');

function checkViteProcess() {
  exec('ps aux | grep -E "vite.*--host"', (error, stdout) => {
    if (error) return;

    const lines = stdout.split('\n').filter(line =>
      line.includes('vite') && !line.includes('grep')
    );

    if (lines.length > 0) {
      const viteLine = lines[0];
      const parts = viteLine.split(/\s+/);
      const cpu = parts[2] + '%';
      const memory = parts[3] + '%';
      const memoryKB = parts[5];

      console.log(`⚡ Vite Process Status:`);
      console.log(`   CPU Usage: ${cpu}`);
      console.log(`   Memory Usage: ${memory} (${Math.round(memoryKB / 1024)}MB)`);
    }
  });
}

function checkCacheSize() {
  const cacheDir = 'node_modules/.vite';
  if (fs.existsSync(cacheDir)) {
    exec(`du -sh ${cacheDir}`, (error, stdout) => {
      if (!error) {
        console.log(`📦 Vite Cache Size: ${stdout.trim().split('\t')[0]}`);
      }
    });
  }
}

function checkPortStatus() {
  exec('lsof -i :3000', (error, stdout) => {
    if (!error && stdout) {
      console.log('🌐 Port 3000: ✅ Active');
    } else {
      console.log('🌐 Port 3000: ❌ Not accessible');
    }
  });
}

// Initial check
checkViteProcess();
checkCacheSize();
checkPortStatus();

// Monitor every 10 seconds
setInterval(() => {
  console.log('\n' + '='.repeat(50));
  console.log(new Date().toLocaleTimeString() + ' - Performance Check');
  checkViteProcess();
  checkCacheSize();
  checkPortStatus();
}, 10000);

console.log('\n💡 Press Ctrl+C to stop monitoring\n'); 