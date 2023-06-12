const { ipcRenderer } = require('electron');

// Listen for the 'generate-pdf' event from the main process
ipcRenderer.on('generate-pdf', () => {
  const { PythonShell } = require('python-shell');
  const path = require('path');

  let options = {
    scriptPath: path.join(__dirname, 'python-scripts'), // Directory containing your Python scripts
  };

  PythonShell.run('generate.py', options, function (err, result) {
    if (err) throw err;

    // After the PDF generation is complete, send an event to the main process
    ipcRenderer.send('pdf-generated', path.join(__dirname, 'python-scripts', 'output.pdf'));
  });
});

// Trigger the 'generate-pdf' event when the app starts up
document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('generate-pdf');
});

// Listen for the 'display-pdf' event from the main process
ipcRenderer.on('display-pdf', (event, pdfPath) => {
  const pdfContainer = document.getElementById('pdf-container');
  pdfContainer.innerHTML = `<embed src="${pdfPath}" type="application/pdf" width="100%" height="100%" />`;
});
