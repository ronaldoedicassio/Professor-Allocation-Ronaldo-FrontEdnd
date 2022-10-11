const coursesUrl = "http://localhost:8080/courses";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

async function getCourses() {
    const response = await fetch(coursesUrl);
    if (response.ok) {
        const courses = await response.json();

        if(courses.length > 0){
            table.removeAttribute('hidden');
            courses.forEach((course)=> {
                creatRow(course);
            })
        }
    }
}

function creatRow({ id, name }) {
    const row = document.createElement('tr');
    const idCollumn = document.createElement('th');
    const nameCollumn = document.createElement('td');

    idCollumn.textContent = id;
    idCollumn.setAttribute("scope", "row");

    nameCollumn.textContent = name;

    row.appendChild(idCollumn);
    row.appendChild(nameCollumn)

    tableBody.appendChild(row);
}

getCourses();