const express = require('express');

const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for HTML, CSS, client-side JS)
app.use(express.static('public'));

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { username } = req.body;
  // Store username in local storage (for simplicity, using cookies here)
  res.cookie('username', username);
  res.redirect('/');
});

// Endpoint to handle sending messages
app.post('/send-message', (req, res) => {
  const { message } = req.body;
  const username = req.cookies.username || 'Unknown';

  // Store message in a file
  fs.appendFile('messages.txt', `${username}: ${message}\n`, (err) => {
    if (err) throw err;
    console.log('Message saved!');
  });

  res.send('Message sent successfully!');
});

const PORT = 3000;
app.listen(3000);
