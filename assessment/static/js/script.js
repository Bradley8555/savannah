document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [usersResponse, albumsResponse, photosResponse] = await Promise.all([
            fetch('http://127.0.0.1:8000/api/users/'),
            fetch('http://127.0.0.1:8000/api/albums/'),
            fetch('http://127.0.0.1:8000/api/photos/')
        ]);

        if (!usersResponse.ok || !albumsResponse.ok || !photosResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const usersData = await usersResponse.json();
        const albumsData = await albumsResponse.json();
        const photosData = await photosResponse.json();

        const users = Array.isArray(usersData) ? usersData : usersData.users || [];
        const albums = Array.isArray(albumsData) ? albumsData : albumsData.albums || [];
        const photos = Array.isArray(photosData) ? photosData : photosData.photos || [];

        const usersMap = users.reduce((map, user) => {
            map[user.id] = user.name;
            return map;
        }, {});

        const albumsMap = albums.reduce((map, album) => {
            map[album.id] = album;
            return map;
        }, {});

        if (document.getElementById('userCards')) {
            loadUserCards(users);
        }

        if (document.getElementById('albumCards')) {
            loadAlbumCards(albums, usersMap);
        }

        if (document.getElementById('photoCards')) {
            loadPhotoCards(photos, albumsMap);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function loadUserCards(users) {
    const container = document.getElementById('userCards');
    container.innerHTML = users.map(user => `
        <div class="card">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <button class="view-more-btn" onclick="showUserModal(${user.id}, '${user.name}', '${user.email}', '${user.phone}', '${user.website}', '${user.address?.street || ''}, ${user.address?.city || ''}', '${user.company?.name || ''}', '${user.company?.catchPhrase || ''}', '${user.company?.bs || ''}')">View More</button>
        </div>
    `).join('');
}

function showUserModal(id, name, email, phone, website, address, companyName, catchPhrase, bs) {
    document.getElementById('modalUserName').textContent = name;
    document.getElementById('modalUsername').textContent = name;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalPhone').textContent = phone;
    document.getElementById('modalWebsite').textContent = website;
    document.getElementById('modalAddress').textContent = address;
    document.getElementById('modalCompanyName').textContent = companyName;
    document.getElementById('modalCatchPhrase').textContent = catchPhrase;
    document.getElementById('modalBs').textContent = bs;
    document.getElementById('userModal').style.display = 'block';
}

function loadAlbumCards(albums, usersMap) {
    const container = document.getElementById('albumCards');
    container.innerHTML = albums.map(album => `
        <div class="card">
            <h3>${album.title}</h3>
            <p>By: ${usersMap[album.userId] || 'Unknown'}</p>
            <button class="view-more-btn" onclick="showAlbumModal('${album.title}')">View Photos</button>
        </div>
    `).join('');
}

function showAlbumModal(albumTitle) {
    document.getElementById('modalAlbumTitle').textContent = albumTitle;
    document.getElementById('albumModal').style.display = 'block';
}

function loadPhotoCards(photos, albumsMap) {
    const container = document.getElementById('photoCards');
    if (!container) {
        console.error('photoCards element not found');
        return;
    }
    container.innerHTML = photos.map(photo => {
        const album = albumsMap[photo.albumId];
        const albumTitle = album ? album.title : 'Unknown Album';
        const shortUrl = photo.url ? new URL(photo.url).hostname : '';

        return `
            <div class="photo-card">
                <h4>${albumTitle}</h4>
                <p>${photo.title}</p>
                <a href="${photo.url}" target="_blank" title="${photo.url}">
                    ${shortUrl}
                </a>
            </div>
        `;
    }).join('');
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
}
