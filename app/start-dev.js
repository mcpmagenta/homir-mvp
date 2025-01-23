const { execSync, spawn } = require('child_process');
const os = require('os');

const PORT = 3333;

function killProcessOnPort(port) {
  try {
    let command;
    if (os.platform() === 'win32') {
      command = `FOR /F "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`;
    } else {
      command = `lsof -ti:${port} | xargs kill -9`;
    }
    execSync(command, { stdio: 'ignore' });
    console.log(`Killed process on port ${port}`);
  } catch (error) {
    console.log(`No process found on port ${port}`);
  }
}

function startNextDevServer() {
  console.log('Starting Next.js development server...');
  const nextProcess = spawn('next', ['dev', '-p', PORT.toString()], { stdio: 'inherit' });

  nextProcess.on('error', (err) => {
    console.error('Failed to start Next.js development server:', err);
  });

  nextProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`Next.js development server exited with code ${code}`);
    }
  });
}

// Main execution
killProcessOnPort(PORT);
startNextDevServer();

// Log the current time when the script starts
console.log(`Script started at: ${new Date().toLocaleString()}`);