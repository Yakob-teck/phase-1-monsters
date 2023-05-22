const baseURL = 'http://localhost:3000/monsters';
let offset = 0;
const limit = 50;

function createMonster() {
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const descriptionInput = document.getElementById('description');

  const name = nameInput.value;
  const age = ageInput.value;
  const description = descriptionInput.value;

  const monster = {
    name: name,
    age: age,
    description: description
  };

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(monster)
  })
    .then(response => response.json())
    .then(data => {
      addMonsterToList(data);
      nameInput.value = '';
      ageInput.value = '';
      descriptionInput.value = '';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function addMonsterToList(monster) {
  const container = document.getElementById('monster-container');

  const monsterDiv = document.createElement('div');
  monsterDiv.classList.add('monster');
  monsterDiv.innerHTML = `
    <h3>${monster.name}</h3>
    <p>Age: ${monster.age}</p>
    <p>${monster.description}</p>
  `;

  container.appendChild(monsterDiv);
}

function loadMonsters() {
  fetch(`${baseURL}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(monster => {
        addMonsterToList(monster);
      });
      offset += limit;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.getElementById('create-monster-btn').addEventListener('click', createMonster);
document.getElementById('load-more').addEventListener('click', loadMonsters);

loadMonsters();
