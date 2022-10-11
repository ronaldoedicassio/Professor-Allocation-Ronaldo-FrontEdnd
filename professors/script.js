const professorsUrl = "http://localhost:8080/professors";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

async function getProfessors() {
    const response = await fetch(professorsUrl);
    if (response.ok) {
        const professors = await response.json();

        if (professors.length > 0) {
            table.removeAttribute('hidden');
            professors.forEach((professor) => {
                createRow(professor);
            })
        }
    }
}

function createRow({ id, name, department }) {
    const row = document.createElement('tr');
    const idColumn = document.createElement('th');
    const nameCollumn = document.createElement('td');
    const departmentCollumn = document.createElement('td');

    idColumn.textContent = id;
    idColumn.setAttribute("scope", "row");

    nameCollumn.textContent = name;
    departmentCollumn.textContent = department.name;

    row.appendChild(idColumn);
    row.appendChild(nameCollumn)
    row.appendChild(departmentCollumn);

    tableBody.appendChild(row);
}

getProfessors();