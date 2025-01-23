import { readdir, readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';

async function getAllFiles(dir) {
  const files = [];
  
  async function scan(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const path = join(directory, entry.name);
      
      if (entry.isDirectory()) {
        if (!['node_modules', '.git', '.next'].includes(entry.name)) {
          await scan(path);
        }
      } else {
        // Only include relevant file types
        if (/\.(js|jsx|ts|tsx|css|json|md|prisma)$/.test(entry.name)) {
          files.push(path);
        }
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function combineFiles(directory) {
  try {
    console.log('Scanning directory...');
    const files = await getAllFiles(directory);
    
    console.log(`Found ${files.length} files to process`);
    
    let combined = '';
    
    for (const file of files) {
      const relativePath = relative(directory, file);
      const content = await readFile(file, 'utf8');
      
      combined += `\n--- START FILE: ${relativePath} ---\n`;
      combined += content;
      combined += `\n--- END FILE: ${relativePath} ---\n`;
    }
    
    const outputPath = join(directory, 'full_codebase.txt');
    await writeFile(outputPath, combined);
    
    console.log(`\nSuccess! Combined codebase written to: ${outputPath}`);
    console.log('Total size:', (combined.length / 1024).toFixed(2), 'KB');
    
    // Preview the first few files
    const firstFewFiles = combined.split('--- START FILE:').slice(1, 4);
    console.log('\nPreview of first few files:');
    firstFewFiles.forEach(file => {
      const filename = file.split('\n')[0];
      console.log('- ' + filename);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script on the current directory
combineFiles('.');