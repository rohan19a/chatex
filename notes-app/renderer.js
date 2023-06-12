function toggleCodeOutput() {
  var codeOutput = document.querySelector('.code-output');
  codeOutput.style.display = codeOutput.style.display === 'none' ? 'block' : 'none';
  
  var button = document.getElementById('toggle-btn');
  button.classList.toggle('clicked');

  var outputTextarea = document.getElementById('output-textarea');
  var text = "";
  fetch('http://127.0.0.1:5000/test')
  .then(response => response.text())
  .then(data => {
    text += data;
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


  outputTextarea.value = outputTextarea.value + text;
}


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
