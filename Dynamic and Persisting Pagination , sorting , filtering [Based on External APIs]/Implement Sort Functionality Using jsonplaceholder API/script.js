async function fetchAndRenderUsers() {
    const sortBy = document.getElementById('sort').value;

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();

        if (sortBy === 'name') {
            data.sort((a, b) => a.name.localeCompare(b.name));
        }

        renderUsers(data);

    } catch (error) {
        alert("Data is not fetched");
        console.error(error);
    }
}

function renderUsers(users) {
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.company.name}</td>
        `;
        tbody.appendChild(row);
    });
}

window.onload = fetchAndRenderUsers;
