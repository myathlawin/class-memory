// API handler for Class Memory Platform

class MockAPI {
    constructor() {
        this.baseUrl = './mock-api.json';
        this.cache = null;
    }

    // Simulate API delay for realistic behavior
    async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Load mock data from JSON file
    async loadMockData() {
        if (this.cache) {
            return this.cache;
        }

        try {
            const response = await fetch(this.baseUrl);
            this.cache = await response.json();
            return this.cache;
        } catch (error) {
            console.error('Failed to load mock data:', error);
            return this.getFallbackData();
        }
    }

    // Fallback data in case JSON file fails to load
    getFallbackData() {
        return {
            students: [],
            events: [],
            gallery: { recent: [], featured: [] }
        };
    }

    // Get all students
    async getStudents() {
        await this.delay(300);
        const data = await this.loadMockData();
        return data.students || [];
    }

    // Get student by ID
    async getStudent(id) {
        await this.delay(200);
        const data = await this.loadMockData();
        return data.students?.find(student => student.id === parseInt(id));
    }

    // Get all events
    async getEvents() {
        await this.delay(400);
        const data = await this.loadMockData();
        return data.events || [];
    }

    // Get event by ID
    async getEvent(id) {
        await this.delay(200);
        const data = await this.loadMockData();
        return data.events?.find(event => event.id === parseInt(id));
    }

    // Get gallery items
    async getGallery() {
        await this.delay(300);
        const data = await this.loadMockData();
        return data.gallery || { recent: [], featured: [] };
    }

    // Get recent memories (mix of students and media)
    async getRecentMemories() {
        await this.delay(500);
        const data = await this.loadMockData();
        const memories = [];

        // Add some student profiles
        if (data.students) {
            data.students.slice(0, 3).forEach(student => {
                memories.push({
                    type: 'profile',
                    title: student.name,
                    subtitle: `Class of ${student.classYear}`,
                    description: student.bio,
                    image: student.avatar,
                    data: student
                });
            });
        }

        // Add some recent gallery items
        if (data.gallery?.recent) {
            data.gallery.recent.forEach(item => {
                memories.push({
                    type: 'media',
                    title: item.title,
                    subtitle: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                    description: item.description,
                    image: item.thumbnail || item.url,
                    data: item
                });
            });
        }

        // Add some event media
        if (data.events) {
            data.events.forEach(event => {
                if (event.media && event.media.length > 0) {
                    const mediaItem = event.media[0]; // Take first media item
                    memories.push({
                        type: 'event_media',
                        title: mediaItem.title,
                        subtitle: event.title,
                        description: mediaItem.description,
                        image: mediaItem.thumbnail || mediaItem.url,
                        data: { ...mediaItem, event: event }
                    });
                }
            });
        }

        // Shuffle and return limited number
        return memories.sort(() => Math.random() - 0.5).slice(0, 8);
    }

    // Search functionality
    async search(query) {
        await this.delay(300);
        const data = await this.loadMockData();
        const results = [];

        // Search in students
        data.students?.forEach(student => {
            if (student.name.toLowerCase().includes(query.toLowerCase()) ||
                student.bio.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'student',
                    title: student.name,
                    description: student.bio,
                    data: student
                });
            }
        });

        // Search in events
        data.events?.forEach(event => {
            if (event.title.toLowerCase().includes(query.toLowerCase()) ||
                event.description.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'event',
                    title: event.title,
                    description: event.description,
                    data: event
                });
            }
        });

        return results;
    }

    // Get timeline data
    async getTimelineData() {
        await this.delay(300);
        const events = await this.getEvents();
        const timeline = {};

        events.forEach(event => {
            if (!timeline[event.year]) {
                timeline[event.year] = [];
            }
            timeline[event.year].push(event);
        });

        return timeline;
    }
}

// Initialize API instance
const api = new MockAPI();

// Utility functions for handling media
const MediaUtils = {
    // Check if URL is a video
    isVideo(url) {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || 
               url.includes('sample-videos.com');
    },

    // Create video element
    createVideoElement(src, thumbnail, title) {
        return `
            <div class="video-container">
                <video 
                    controls 
                    poster="${thumbnail}"
                    preload="metadata"
                    style="width: 100%; height: auto; border-radius: 8px;"
                >
                    <source src="${src}" type="video/mp4">
                    <p>Your browser doesn't support video playback.</p>
                </video>
                <div class="video-overlay">
                    <span class="play-button">▶</span>
                </div>
            </div>
        `;
    },

    // Create image element
    createImageElement(src, alt, className = '') {
        return `
            <img 
                src="${src}" 
                alt="${alt}" 
                class="${className}"
                style="width: 100%; height: auto; border-radius: 8px;"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'"
            >
        `;
    },

    // Handle media loading errors
    handleMediaError(element, fallbackUrl) {
        element.onerror = () => {
            element.src = fallbackUrl || 'https://via.placeholder.com/400x300?text=Media+Not+Available';
        };
    }
};

// Export for use in other files
window.api = api;
window.MediaUtils = MediaUtils;
