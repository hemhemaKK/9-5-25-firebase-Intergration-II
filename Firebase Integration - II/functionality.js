async function user() {
    const name = document.getElementById('name').value.trim();
    const membershipDate = document.getElementById('membership').value;
    const active = document.getElementById('active').value === "true";

    if (!name || !membershipDate) {
        alert("Please fill all user fields.");
        return;
    }

    const newUser = { name, membershipDate, active };

    try {
        const res = await fetch('https://sample-1a721-default-rtdb.asia-southeast1.firebasedatabase.app/members.json', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        if (!res.ok) throw new Error("Failed to add user.");
        alert("User added successfully!");

        // Reset fields 
        document.getElementById('name').value = "";
        document.getElementById('membership').value = "";
        document.getElementById('active').value = "true";

    } catch (err) {
        alert("Error: " + err.message);
    }
}

async function book() {
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('book').value.trim();
    const publishedYear = document.getElementById('publishedYear').value.trim();
    const availability = document.getElementById('availability').value === "true";
    const title = document.getElementById('title').value.trim();

    if (!author || !genre || !publishedYear || !title) {
        alert("Please fill all book fields.");
        return;
    }

    const newBook = {
        author,
        genre,
        publishedYear: parseInt(publishedYear),
        availability,
        title,
    };

    try {
        const res = await fetch('https://sample-1a721-default-rtdb.asia-southeast1.firebasedatabase.app/books.json', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook)
        });

        if (!res.ok) throw new Error("Failed to add book.");
        alert("Book added successfully!");

        // Reset fields 
        document.getElementById('author').value = "";
        document.getElementById('book').value = "";
        document.getElementById('publishedYear').value = "";
        document.getElementById('availability').value = "true";
        document.getElementById('title').value = "";

    } catch (err) {
        alert("Error: " + err.message);
    }
}

async function displayUsers(filters = {}) {
    const res = await fetch('https://sample-1a721-default-rtdb.asia-southeast1.firebasedatabase.app/members.json');
    const data = await res.json();
    const tableBody = document.querySelector('#users-list tbody');
    tableBody.innerHTML = "";

    for (let id in data) {
        const { name, membershipDate, active } = data[id];

        if (filters.status && active !== filters.status) continue;
        if (filters.membershipDate && membershipDate !== filters.membershipDate) continue;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${membershipDate}</td>
            <td>${active ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    }
}

async function displayBooks(filters = {}) {
    const res = await fetch('https://sample-1a721-default-rtdb.asia-southeast1.firebasedatabase.app/books.json');
    const data = await res.json();
    const tableBody = document.querySelector('#books-list tbody');
    tableBody.innerHTML = "";

    for (let id in data) {
        const { title, author, genre, publishedYear, availability } = data[id];

        if (filters.genre && genre !== filters.genre) continue;
        if (filters.author && author !== filters.author) continue;
        if (filters.availability !== undefined && availability !== filters.availability) continue;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${genre}</td>
            <td>${publishedYear}</td>
            <td>${availability ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    }
}

function applyUserFilters() {
    const status = document.getElementById('user-status').value;
    const membershipDate = document.getElementById('user-membership-date').value;

    const filters = {
        status: status ? (status === "true") : undefined,
        membershipDate: membershipDate || undefined
    };

    displayUsers(filters);
}

function applyBookFilters() {
    const genre = document.getElementById('book-genre').value;
    const author = document.getElementById('book-author').value;
    const availability = document.getElementById('book-availability').value;

    const filters = {
        genre: genre || undefined,
        author: author || undefined,
        availability: availability ? (availability === "true") : undefined
    };

    displayBooks(filters);
}
