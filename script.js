// JavaScript to handle loading and interaction

document.addEventListener('DOMContentLoaded', async function () {
    // Get elements
    const memoriesGrid = document.getElementById('memories-grid');
    const profilesGrid = document.getElementById('profiles-grid');
    const activitiesContainer = document.getElementById('activities-container');
    const timelineContainer = document.getElementById('timeline-container');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.close');

    // Show loading state
    showLoading(memoriesGrid);
    showLoading(profilesGrid);
    showLoading(activitiesContainer);
    showLoading(timelineContainer);

    try {
        // Load memories
        const memories = await api.getRecentMemories();
        memoriesGrid.innerHTML = '';
        memories.forEach(memory => {
            const card = createCard(memory);
            if (card) {
                memoriesGrid.appendChild(card);
            }
        });

        // Load student profiles
        const students = await api.getStudents();
        profilesGrid.innerHTML = '';
        students.forEach(student => {
            const card = createProfileCard(student);
            profilesGrid.appendChild(card);
        });

        // Load activities
        const events = await api.getEvents();
        activitiesContainer.innerHTML = '';
        events.forEach(event => {
            const activityCard = createActivityCard(event);
            activitiesContainer.appendChild(activityCard);
        });

        // Load timeline
        const timelineData = await api.getTimelineData();
        timelineContainer.innerHTML = '';
        Object.keys(timelineData).sort().forEach(year => {
            const yearEvents = timelineData[year];
            yearEvents.forEach(event => {
                const timelineItem = createTimelineItem(event);
                timelineContainer.appendChild(timelineItem);
            });
        });
    } catch (error) {
        console.error('Failed to load data:', error);
        showError('Failed to load content. Please try refreshing the page.');
    }

    // Modal functionality
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    function createCard(memory) {
        const card = document.createElement('div');
        card.className = 'card';
        
        let imageContent = '';
        if (memory.type === 'profile') {
            imageContent = MediaUtils.createImageElement(memory.image, memory.title, 'profile-image');
        } else if (memory.type === 'media' || memory.type === 'event_media') {
            if (MediaUtils.isVideo(memory.data.url)) {
                imageContent = `
                    <div class="video-thumbnail">
                        ${MediaUtils.createImageElement(memory.image, memory.title, 'media-thumbnail')}
                        <div class="play-overlay">▶</div>
                    </div>
                `;
            } else {
                imageContent = MediaUtils.createImageElement(memory.image, memory.title, 'media-image');
            }
        }
        
        card.innerHTML = `
            <div class="card-image">
                ${imageContent}
            </div>
            <div class="card-content">
                <h3 class="card-title">
                    ${memory.title}
                </h3>
                <p class="card-subtitle">
                    ${memory.subtitle}
                </p>
                <p class="card-text">
                    ${memory.description.substring(0, 120)}${memory.description.length > 120 ? '...' : ''}
                </p>
            </div>
        `;
        card.onclick = () => loadModalContent(memory);
        return card;
    }

    function createProfileCard(student) {
        const card = document.createElement('div');
        card.className = 'card profile-card';
        card.innerHTML = `
            <div class="profile-image-container">
                ${MediaUtils.createImageElement(student.avatar, student.name, 'profile-avatar-img')}
            </div>
            <div class="card-content">
                <h3 class="card-title">
                    ${student.name}
                </h3>
                <p class="card-subtitle">
                    Class of ${student.classYear}
                </p>
                <p class="card-text">
                    ${student.bio}
                </p>
                <div class="contact-info">
                    <div class="contact-item">📧 ${student.email}</div>
                    <div class="contact-item">📞 ${student.phone}</div>
                </div>
                <div class="social-links">
                    <a href="${student.social.facebook}" class="social-link" target="_blank">🔗 FB</a>
                    <a href="${student.social.instagram}" class="social-link" target="_blank">🔗 IG</a>
                    <a href="${student.social.linkedin}" class="social-link" target="_blank">🔗 IN</a>
                </div>
            </div>
        `;
        return card;
    }

    function createActivityCard(event) {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.innerHTML = `
            <div class="activity-header">
                <h3 class="activity-title">
                    ${event.title}
                </h3>
                <p class="activity-date">
                    ${event.date}
                </p>
                <p class="card-text">
                    ${event.description}
                </p>
            </div>
            <div class="media-grid">
                ${event.media.map(createMediaItem).join('')}
            </div>
        `;
        return activityCard;
    }

    function createMediaItem(media) {
        let mediaContent = '';
        if (MediaUtils.isVideo(media.url)) {
            mediaContent = `
                <div class="video-thumbnail">
                    ${MediaUtils.createImageElement(media.thumbnail, media.title, 'media-thumbnail')}
                    <div class="play-overlay">▶</div>
                    <div class="duration-badge">${media.duration || ''}</div>
                </div>
            `;
        } else {
            mediaContent = MediaUtils.createImageElement(media.thumbnail || media.url, media.title, 'media-image');
        }
        
        return `
            <div class="media-item" onclick="openMediaModal('${media.id}', '${media.type}', '${media.url}', '${media.title}', '${media.description}', '${media.thumbnail || media.url}')">
                <div class="media-placeholder">
                    ${mediaContent}
                </div>
                <div class="media-content">
                    <h4 class="media-title">
                        ${media.title}
                    </h4>
                    <p class="media-description">
                        ${media.description.substring(0, 80)}${media.description.length > 80 ? '...' : ''}
                    </p>
                </div>
            </div>
        `;
    }

    function createTimelineItem(event) {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-year">${event.year}</span>
                <h3 class="event-title">
                    ${event.title}
                </h3>
                <p class="card-text">
                    ${event.description}
                </p>
            </div>
        `;
        return timelineItem;
    }

    function loadModalContent(memory) {
        modalBody.innerHTML = memory.type === 'media'
            ? `
                <h3>${memory.data.title}</h3>
                <p>${memory.data.description}</p>
                <div>${memory.data.placeholder}</div>
                <p>Event: ${memory.data.event.title}</p>
            `
            : `
                <h3>${memory.data.name}</h3>
                <p>Class of ${memory.data.classYear}</p>
                <p>${memory.data.bio}</p>
                <div class="contact-info">
                    <div class="contact-item">📧 ${memory.data.email}</div>
                    <div class="contact-item">📞 ${memory.data.phone}</div>
                </div>
                <div class="social-links">
                    <a href="${memory.data.social.facebook}" class="social-link" target="_blank">🔗 FB</a>
                    <a href="${memory.data.social.instagram}" class="social-link" target="_blank">🔗 IG</a>
                    <a href="${memory.data.social.linkedin}" class="social-link" target="_blank">🔗 IN</a>
                </div>
            `;
        modal.style.display = 'block';
    }
});



// Navigation logic
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.nav-link.active').classList.remove('active');
            link.classList.add('active');
            const activeSection = document.querySelector('.section.active');
            activeSection.classList.remove('active');
            document.querySelector(link.getAttribute('href')).classList.add('active');
        });
    });
});

// Utility functions
function showLoading(container) {
    container.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h3>⚠️ Error</h3>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Media modal function
function openMediaModal(id, type, url, title, description, thumbnail) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    let content = '';
    if (type === 'video') {
        content = `
            <h3>${title}</h3>
            <div class="media-modal-container">
                ${MediaUtils.createVideoElement(url, thumbnail, title)}
            </div>
            <p>${description}</p>
        `;
    } else {
        content = `
            <h3>${title}</h3>
            <div class="media-modal-container">
                ${MediaUtils.createImageElement(url, title, 'modal-image')}
            </div>
            <p>${description}</p>
        `;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

