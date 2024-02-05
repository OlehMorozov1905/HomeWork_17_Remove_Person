const addPerson = document.getElementById('addPerson');
const calcStats = document.getElementById('calcStats');
const personsList = document.getElementById('personsList');
const statsElement = document.getElementById('stats');
const persons = [];

addPerson.onclick = function () {
    const personId = document.getElementById('personId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;

    if (!personId || !firstName || !lastName || !birthDate) {
        alert("Please fill out the input fields first");
        return;
    }

    if (findPerson(persons, personId) === -1) {
        const person = new Person(personId, firstName, lastName, birthDate);
        persons.push(person);
        const listItem = document.createElement('li');
        listItem.innerHTML = `${person.toString()} <button onclick="removePerson(this)">Remove person</button>`;
        personsList.appendChild(listItem);
    } else {
        alert(`Person with id = ${personId} exists`);
    }

    clearStats();

    const inputIds = ['personId', 'firstName', 'lastName', 'birthDate'];
    inputIds.forEach(id => document.getElementById(id).value = '');
}

calcStats.onclick = function () {
    if (persons.length === 0) {
        alert("The array of persons is empty, first fill in the input fields and click the 'Add person' button");
        return;
    }

    clearStats();

    const personOldest = persons.reduce((accum, p) => p.age > accum.age ? p : accum);
    const personYoungest = persons.reduce((accum, p) => p.age < accum.age ? p : accum);
    const averageAge = persons.reduce((sum, p) => sum + p.age, 0) / persons.length;

    const oldestAge = document.createElement('p');
    oldestAge.append(`Oldest age: ${personOldest.age}`);
    const youngestAge = document.createElement('p');
    youngestAge.append(`Youngest age: ${personYoungest.age}`);
    const averageAgeP = document.createElement('p');
    averageAgeP.append(`Average age: ${averageAge.toFixed(1)}`);

    statsElement.appendChild(oldestAge)
    statsElement.appendChild(youngestAge);
    statsElement.appendChild(averageAgeP);
}

function clearStats() {
    while (statsElement.firstChild) {
        statsElement.removeChild(statsElement.firstChild);
    }
}

function findPerson(persons, personId) {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === personId) {
            return i;
        }
    }
    return -1;
}

function removePerson(button) {
    const personItem = button.parentElement;
    const index = Array.from(personItem.parentElement.children).indexOf(personItem);
    
    if (index !== -1) {
        persons.splice(index, 1);
        personItem.remove();
        clearStats();
    }
}

function Person(id, firstName, lastName, birthDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    let today = new Date();
    let birthDateObj = new Date(birthDate);
    this.age = today.getFullYear() - birthDateObj.getFullYear();
    this.toString = function () {
        return `id: ${this.id}, firstName: ${this.firstName}, lastName: ${this.lastName}, age: ${this.age}`;
    }
}