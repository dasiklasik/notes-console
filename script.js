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

function list() {
  fs.readFile('notes.json', (error, data) => {
    if (error) return console.error(error.message);
    const notes = JSON.parse(data);
    if(notes.length === 0) console.log('Заметки еще не созданы');
    notes.forEach((value, index) => {
      const str = `${index + 1}. ${value.title}: ${value.content}`;
      console.log(str)
    })
  })
}

function view(title) {
  fs.readFile('notes.json', (error, data) => {
    if (error) return console.error(error.message);
    const notes = JSON.parse(data);
    const note = notes.find(note => note.title === title);
    if (note) {
      console.log(note.content)
    } else {
      console.log('Такой заметки не существует')
    }
  })
}

function remove(title) {
  fs.readFile('notes.json', (error, data) => {
    if (error) return console.error(error.message);
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.title !== title);
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json', json, (error) => {
      if (error) return console.error(error.message);
      console.log('Заметка удалена');
    });
  });
}

switch (command) {
  case 'list':
    list();
    break;
  case 'view':
    if (!title) {
      console.log('Необходимо ввести заголовок заметки при запуске функции');
    } else {
      view(title);
    }
    break;
  case 'create':
    create(title, content);
    break;
  case 'remove':
    if (!title) {
      console.log('Необходимо ввести заголовок заметки при запуске функции');
    } else {
      remove(title);
    }
    break;
  default: console.log('Неизвестная команда')
}