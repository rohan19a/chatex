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
  fetch('http://localhost/api', {
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

// Attach an event listener to the textarea
const textarea = document.getElementById('input-textarea');
textarea.addEventListener('input', sendTextToAPI);
