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

function generatePDF(latexCode) {
  fetch('http://127.0.0.1:5000/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/text'
    },
    body: latexCode
  })
    .then(response => response.text())
    .then(pdfUrl => {
      console.log('PDF URL:', pdfUrl);
      // Perform any further actions with the PDF URL
    })
    .catch(error => {
      console.error('Error:', error);
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
