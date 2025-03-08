const users = [
    { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031 x56442", website: "hildegard.org" },
    { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593 x09125", website: "anastasia.net" },
    { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", phone: "1-463-123-4447", website: "ramiro.info" }
];

function loadUserCards() {
    const container = document.getElementById('userCards');
    container.innerHTML = users.map(user => `
        <div class="card" onclick="showUserModal(${user.id})">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <button class="view-more-btn">View More</button>
        </div>
    `).join('');
}

function showUserModal(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('modalUserName').textContent = user.name;
        document.getElementById('modalUsername').textContent = user.username;
        document.getElementById('modalEmail').textContent = user.email;
        document.getElementById('modalPhone').textContent = user.phone;
        document.getElementById('modalWebsite').textContent = user.website;
        document.getElementById('userModal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

loadUserCards();