const departmentsUrl = "http://localhost:8080/departments";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

const inputName = document.getElementById('input-name');
const btnSalvar = document.getElementById('btn-salvar');
const addbtn = document.getElementById('addbtn');

let actualId = 0;

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
    const actionsCollumn = document.createElement('td');

    const imgDelete = document.createElement('img');
    imgDelete.src = '../assets/delete.svg';

    const imgEdit = document.createElement('img');
    imgEdit.src = '../assets/edit.svg';

    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', () => remover(id, name, row));
    btnDelete.classList.add('btn');
    btnDelete.classList.add('button-ghost');
    btnDelete.appendChild(imgDelete);

    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('data-bs-toggle', 'modal');
    btnEdit.setAttribute('data-bs-target', '#form-departments');
    btnEdit.addEventListener('click', () => abrirModalAtualizar(id, name));
    btnEdit.classList.add('btn');
    btnEdit.classList.add('button-ghost');
    btnEdit.appendChild(imgEdit);

    
    idColumn.textContent = id;
    idColumn.setAttribute("scope", "row");

    nameCollumn.textContent = name;

    actionsCollumn.appendChild(btnDelete);
    actionsCollumn.appendChild(btnEdit);

    row.appendChild(idColumn);
    row.appendChild(nameCollumn)
    row.appendChild(actionsCollumn);

    tableBody.appendChild(row);
}

getDepartments();