const departmentsUrl = "http://localhost:8080/departments";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

async function getDepartments() {
    const response = await fetch(departmentsUrl);
    if (response.ok) {
        const departments = await response.json();

        if (departments.length > 0) {
            table.removeAttribute('hidden');
            departments.forEach((department) => {
                creatRow(department);
            })
        }
    }
}

function creatRow({ id, name }) {
    const row = document.createElement('tr');
    const idColumn = document.createElement('th');
    const nameCollumn = document.createElement('td');

    idColumn.textContent = id;
    idColumn.setAttribute("scope", "row");

    nameCollumn.textContent = name;

    row.appendChild(idColumn);
    row.appendChild(nameCollumn)

    tableBody.appendChild(row);
}

getDepartments();