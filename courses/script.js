const coursesUrl = "http://localhost:8080/courses";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

const inputName = document.getElementById('input-name');
const btnsave = document.getElementById('btn-save');
const addbtn = document.getElementById('addbtn');

let actualId = 0;

async function getCourses() {
    const response = await fetch(coursesUrl);
    if (response.ok) {
        const courses = await response.json();

        if (courses.length > 0) {
            table.removeAttribute('hidden');
            courses.forEach((course) => {
                createRow(course);
            })
        }

    }
}

async function remove(id, name, row) {
    const result = confirm('Would like remove course : ' + name);

    if (result) {
        const response = await fetch(coursesUrl + "/" + id, {
            method: 'DELETE',
        });
        if (response.ok) {
            tableBody.removeChild(row);
            window.location.reload();
        }
    }
}

async function save() {
    if (actualId) {
        update();
    } else {
        insert();
    }
}

async function insert() {
    const name = inputName.value.trim();

    if (name) {
        const response = await fetch(coursesUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        });
        if (response.ok) {
            const course = await response.json();
            inputName.value = "";
            removeModal();
            createRow(course);
        }
    }
}

async function update() {
    const name = inputName.value.trim();

    if (name) {
        const response = await fetch(coursesUrl + "/" + actualId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        });
        if (response.ok) {
            inputName.value = "";
            removeModal();

            tableBody.innerHTML = "";
            getCourses();
        }
    }
}

function openModalCreate() {
    actualId = 0;
    document.getElementById('formCourseLabel').textContent = 'Insert curso';
    inputName.value = "";
}

function openModalupdate(courseId, name) {
    actualId = courseId;
    document.getElementById('formCourseLabel').textContent = 'Edit course';
    inputName.value = name;
}

function removeModal() {
    const elements = document.getElementsByClassName('fade');

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('show');
    }

    window.location.reload();
}

btnsave.addEventListener('click', save);
addbtn.addEventListener('click', openModalCreate);

function createRow({ id, name }) {
    const row = document.createElement('tr');
    const idCollumn = document.createElement('th');
    const nameCollumn = document.createElement('td');
    const actionsCollumn = document.createElement('t    d');

    const imgDelete = document.createElement('img');
    imgDelete.src = '../assets/delete.svg';

    const imgEdit = document.createElement('img');
    imgEdit.src = '../assets/edit.svg';

    const btnDelete = document.createElement('button');
    btnDelete.addEventListener('click', () => remove(id, name, row));
    btnDelete.classList.add('btn');
    btnDelete.classList.add('button-ghost');
    btnDelete.appendChild(imgDelete);

    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('data-bs-toggle', 'modal');
    btnEdit.setAttribute('data-bs-target', '#form-course');
    btnEdit.addEventListener('click', () => openModalupdate(id, name));
    btnEdit.classList.add('btn');
    btnEdit.classList.add('button-ghost');
    btnEdit.appendChild(imgEdit);

    idCollumn.textContent = id;
    idCollumn.setAttribute("scope", "row");

    nameCollumn.textContent = name;

    actionsCollumn.appendChild(btnDelete);
    actionsCollumn.appendChild(btnEdit);

    row.appendChild(idCollumn);
    row.appendChild(nameCollumn);
    row.appendChild(actionsCollumn);

    tableBody.appendChild(row);
}

getCourses();