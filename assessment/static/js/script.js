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

        loadPhotoCards(photos);
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

let currentUserId = null;

function showUserModal(user) {
    const elements = {
        modalUserName: user.name,
        modalUsername: user.username,
        modalEmail: user.email,
        modalPhone: user.phone,
        modalWebsite: user.website,
        modalAddress: user.address ? `${user.address.street}, ${user.address.city}` : 'N/A',
        modalCompanyName: user.company ? user.company.name : 'N/A',
        modalCatchPhrase: user.company ? user.company.catchPhrase : 'N/A',
        modalBs: user.company ? user.company.bs : 'N/A',
    };

    for (let id in elements) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        } else {
            console.error(`Element with ID '${id}' not found.`);
        }
    }

    document.getElementById('userModal').style.display = 'block';
}

function loadAlbumCards(albums, usersMap) {
    const container = document.getElementById('albumCards');
    container.innerHTML = albums.map(album => `
        <div class="card">
            <h3>${album.title}</h3>
            <p>By: ${usersMap[album.userId] || 'Unknown'}</p>
            <button class="view-more-btn" onclick="showAlbumModal('${album.title}', ${album.id})">View Photos</button>
        </div>
    `).join('');
}

function showAlbumModal(albumTitle, albumId) {
    document.getElementById('modalAlbumTitle').textContent = albumTitle;
    loadAlbumPhotos(albumId);
    document.getElementById('albumModal').style.display = 'block';
}

async function loadAlbumPhotos(albumId) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/photos/?albumId=${albumId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch photos');
        }

        const photos = await response.json();
        const container = document.getElementById('photoCards');
        container.innerHTML = photos.map(photo => `
            <div class="photo-card">
                <p>${photo.title}</p>
                <img src="${photo.thumbnailUrl}" alt="${photo.title}">
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

function loadPhotoCards(photos) {
    const container = document.getElementById('photoCards');
    container.innerHTML = photos.map(photo => `
        <div class="photo-card">
            <h4>${photo.title}</h4>
            <img src="${photo.thumbnailUrl}" alt="${photo.title}">
            <button class="view-more-btn" onclick="showPhotoModal(${photo.id}, '${photo.title}', '${photo.url}', '${photo.thumbnailUrl}')">View More</button>
        </div>
    `).join('');
}

function showPhotoModal(id, title, url, thumbnailUrl) {
    document.getElementById('modalUserName').textContent = title;
    document.getElementById('modalUsername').textContent = title;
    document.getElementById('modalEmail').textContent = url;
    document.getElementById('modalEmail').textContent = thumbnailUrl;

    document.getElementById('userModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function searchPhotos() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const cards = document.getElementsByClassName('photo-card');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const title = card.getElementsByTagName('h4')[0].textContent.toLowerCase();
        if (title.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    }
}

async function viewUserAlbums() {
    if (!currentUserId) {
        console.error('No user selected.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/albums/?userId=${currentUserId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch albums');
        }

        const albums = await response.json();
        displayUserAlbums(albums);
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

function displayUserAlbums(albums) {
    const container = document.getElementById('albumCards');
    if (!container) {
        console.error('albumCards element not found');
        return;
    }

    container.innerHTML = albums.map(album => `
        <div class="card">
            <h3>${album.title}</h3>
            <button class="view-more-btn" onclick="showAlbumModal('${album.title}', ${album.id})">View Photos</button>
        </div>
    `).join('');

    closeModal(); // Hide the user modal and show the albums
}
