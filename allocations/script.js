const allocationsUrl = "http://localhost:8080/allocations";

const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');

async function getAllocations() {
    const response = await fetch(allocationsUrl);

    if (response.ok) {
        const allocations = await response.json();

        if (allocations.length > 0) {
            table.removeAttribute('hidden');
            allocations.forEach((allocation) => {
                createRow(allocation);
            })
        }
    }
}

function createRow(allocation) {
    const row = document.createElement('tr');
    const idCollumn = document.createElement('th');
    const professorCollumn = document.createElement('td');
    const courseCollumn = document.createElement('td');
    const dayCollumn = document.createElement('td');
    const hourCollumn = document.createElement('td');

    idCollumn.textContent = allocation.id;
    idCollumn.setAttribute("scope", "row");

    professorCollumn.textContent = allocation.professor.name;
    
    courseCollumn.textContent = allocation.course.name;

    dayCollumn.textContent = allocation.day;

    const hour = `${allocation.start} - ${allocation.end}`;

    hourCollumn.textContent = hour;

    row.appendChild(idCollumn);
    row.appendChild(professorCollumn);
    row.appendChild(courseCollumn);
    row.appendChild(dayCollumn);
    row.appendChild(hourCollumn);

    tableBody.appendChild(row);
}

getAllocations();