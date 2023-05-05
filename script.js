const fs = require('fs');
const path = require('path');

const [command, title, content] = process.argv.slice(2);

function create(title, content) {
  fs.readFile('notes.json', (error, data) => {
    if (error) return console.error(error.message);
    const notes = JSON.parse(data);
    notes.push({ title, content });
    const json = JSON.stringify(notes);

    fs.writeFile('notes.json', json, (error) => {
      if (error) return console.error(error.message);
      console.log('Заметка создана');
    });
  });
}

switch (command) {
  case 'list':
    break;
  case 'view':
    break;
  case 'create':
    create(title, content);
    break;
  case 'remove':
    break;
  default: console.log('Неизвестная команда')
}