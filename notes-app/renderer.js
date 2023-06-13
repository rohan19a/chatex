const { exec } = require('child_process');
const fs = require('fs');


let dropdownOpen = false;

function toggleDropdown() {
      const dropdownMenu = document.getElementById('dropdown-menu');
      dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    }

function toggleSection(sectionId) {
      const section = document.getElementById(sectionId);
      section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }



//Function to display text to output-area
function displayText(text) {
  var outputTextarea = document.getElementById('output-textarea');
  outputTextarea.value += text;
}


//function to post text to api
function sendTextToAPI() {
  const textarea = document.getElementById('input-textarea');
  const text = textarea.value;

  // Send the text to the backend API
  fetch('http://127.0.0.1:5000/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text })
  })
    .then(response => response.json())
    .then(data => {
      // Process the response from the API
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//convert to pdf
function latexToPdf() {
  var outputTextarea = document.getElementById('output-textarea');
  texCode = outputTextarea.value

  const outputPath = 'output.pdf';
  // Create a temporary .tex file
  const tempFile = 'temp.tex';
  fs.writeFileSync(tempFile, texCode);

  // Run pdflatex command
  exec(`pdflatex -interaction=batchmode ${tempFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred while running pdflatex: ${error}`);
      return;
    }

    // Move the generated PDF to the desired output path
    fs.rename('temp.pdf', outputPath, (error) => {
      if (error) {
        console.error(`Error occurred while moving the PDF file: ${error}`);
        return;
      }

      console.log(`PDF successfully generated at: ${outputPath}`);
    });
  });
}




const textarea = document.getElementById('input-textarea');
let previousText = ''; // Store the previous text

textarea.addEventListener('input', function(event) {
  const text = event.target.value;
  const periodIndex = text.lastIndexOf('.');

  if (periodIndex !== -1) {
    const newText = text.substring(periodIndex + 1); // Extract the new text
    const sendData = previousText + newText; // Combine with previous text

    // Send the extracted data to the API
    sendTextToAPI(sendData);
  } else {
    // If no period exists, send the entire text
    sendTextToAPI(text);
  }

  // Update the previous text for the next input event
  previousText = text;
});









document.addEventListener('keydown', (event) => {
  if (event.ctrlKey) {
    if (event.key === 'c' || event.key === 'C') {
      // Ctrl+C is pressed
      // Copy the selected text to the clipboard
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        copyToClipboard(selectedText);
        console.log('Text copied to clipboard: ' + selectedText);
      }
    } else if (event.key === 'v' || event.key === 'V') {
      // Ctrl+V is pressed
      // Paste the text from the clipboard
      const clipboardText = getClipboardText();
      console.log('Text pasted from clipboard: ' + clipboardText);
    }
  }
});

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function getClipboardText() {
  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  textarea.focus();
  document.execCommand('paste');
  const text = textarea.value;
  document.body.removeChild(textarea);
  return text;
}
