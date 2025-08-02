// Mock data for Class Memory Platform

const mockData = {
    students: [
        {
            id: 1,
            name: "Emily Johnson",
            classYear: "2024",
            bio: "Passionate about environmental science and sustainable living. Captain of the debate team and volunteer at local wildlife sanctuary.",
            email: "emily.johnson@email.com",
            phone: "+1 (555) 123-4567",
            social: {
                facebook: "https://facebook.com/emily.johnson",
                instagram: "https://instagram.com/emily_eco",
                linkedin: "https://linkedin.com/in/emilyjohnson"
            },
            avatar: "EJ"
        },
        {
            id: 2,
            name: "Marcus Chen",
            classYear: "2024",
            bio: "Computer science enthusiast and aspiring game developer. President of the coding club and winner of multiple hackathons.",
            email: "marcus.chen@email.com",
            phone: "+1 (555) 234-5678",
            social: {
                facebook: "https://facebook.com/marcus.chen",
                instagram: "https://instagram.com/marcus_codes",
                linkedin: "https://linkedin.com/in/marcuschen"
            },
            avatar: "MC"
        },
        {
            id: 3,
            name: "Sophia Rodriguez",
            classYear: "2024",
            bio: "Theater arts major with a passion for musical performances. Lead in three school productions and aspiring Broadway performer.",
            email: "sophia.rodriguez@email.com",
            phone: "+1 (555) 345-6789",
            social: {
                facebook: "https://facebook.com/sophia.rodriguez",
                instagram: "https://instagram.com/sophia_sings",
                linkedin: "https://linkedin.com/in/sophiarodriguez"
            },
            avatar: "SR"
        },
        {
            id: 4,
            name: "David Kim",
            classYear: "2024",
            bio: "Star athlete and team captain of the basketball team. Also active in community service and mentoring younger students.",
            email: "david.kim@email.com",
            phone: "+1 (555) 456-7890",
            social: {
                facebook: "https://facebook.com/david.kim",
                instagram: "https://instagram.com/david_hoops",
                linkedin: "https://linkedin.com/in/davidkim"
            },
            avatar: "DK"
        },
        {
            id: 5,
            name: "Isabella Taylor",
            classYear: "2024",
            bio: "Future journalist and editor-in-chief of the school newspaper. Passionate about social justice and community storytelling.",
            email: "isabella.taylor@email.com",
            phone: "+1 (555) 567-8901",
            social: {
                facebook: "https://facebook.com/isabella.taylor",
                instagram: "https://instagram.com/bella_writes",
                linkedin: "https://linkedin.com/in/isabellataylor"
            },
            avatar: "IT"
        }
    ],

    events: [
        {
            id: 1,
            title: "Annual Sports Day",
            date: "2024-05-15",
            year: "2024",
            description: "A day filled with athletic competitions, team spirit, and school pride. Students participated in various sports including track and field, basketball, and swimming.",
            media: [
                {
                    id: 1,
                    type: "image",
                    title: "Track and Field Competition",
                    description: "Students competing in the 100-meter dash with enthusiastic crowd cheering from the sidelines.",
                    placeholder: "📸 Track Competition Photo"
                },
                {
                    id: 2,
                    type: "video",
                    title: "Basketball Championship Game",
                    description: "Highlights from the thrilling basketball final between Class A and Class B teams.",
                    placeholder: "🎥 Basketball Game Video"
                },
                {
                    id: 3,
                    type: "blog",
                    title: "Sports Day Recap Blog",
                    description: "A detailed account of the day's events written by our sports reporter, including interviews with winning athletes and coaches' perspectives on team performance.",
                    placeholder: "📝 Sports Day Blog Post"
                }
            ]
        },
        {
            id: 2,
            title: "Graduation Ceremony",
            date: "2024-06-20",
            year: "2024",
            description: "The culmination of our academic journey. A ceremony celebrating achievements, friendships, and the beginning of new adventures.",
            media: [
                {
                    id: 4,
                    type: "image",
                    title: "Graduation Group Photo",
                    description: "The entire graduating class in their caps and gowns, celebrating this milestone moment together.",
                    placeholder: "📸 Class Group Photo"
                },
                {
                    id: 5,
                    type: "video",
                    title: "Valedictorian Speech",
                    description: "An inspiring speech about overcoming challenges, cherishing memories, and embracing the future.",
                    placeholder: "🎥 Graduation Speech Video"
                },
                {
                    id: 6,
                    type: "blog",
                    title: "Graduation Day Memories",
                    description: "Personal reflections from graduates sharing their favorite school memories and hopes for the future.",
                    placeholder: "📝 Graduation Memories Blog"
                }
            ]
        },
        {
            id: 3,
            title: "Science Field Trip",
            date: "2024-03-10",
            year: "2024",
            description: "An educational adventure to the Natural History Museum and Planetarium, exploring exhibits on biodiversity and space exploration.",
            media: [
                {
                    id: 7,
                    type: "image",
                    title: "Dinosaur Exhibit Visit",
                    description: "Students marveling at the massive T-Rex skeleton while learning about prehistoric life.",
                    placeholder: "📸 Museum Exhibit Photo"
                },
                {
                    id: 8,
                    type: "video",
                    title: "Planetarium Experience",
                    description: "Students experiencing an immersive journey through the solar system and beyond.",
                    placeholder: "🎥 Planetarium Show Video"
                },
                {
                    id: 9,
                    type: "blog",
                    title: "Field Trip Learning Journal",
                    description: "Students' observations and discoveries from the museum visit, including sketches and scientific notes about their favorite exhibits.",
                    placeholder: "📝 Field Trip Journal"
                }
            ]
        }
    ],

    // Generate recent memories by combining students and media
    getRecentMemories() {
        const memories = [];
        
        // Add some student profiles as memories
        this.students.slice(0, 3).forEach(student => {
            memories.push({
                type: 'profile',
                title: student.name,
                subtitle: `Class of ${student.classYear}`,
                description: student.bio,
                data: student
            });
        });

        // Add some event media as memories
        this.events.forEach(event => {
            event.media.slice(0, 2).forEach(media => {
                memories.push({
                    type: 'media',
                    title: media.title,
                    subtitle: event.title,
                    description: media.description,
                    data: { ...media, event: event }
                });
            });
        });

        // Shuffle and return limited number
        return memories.sort(() => Math.random() - 0.5).slice(0, 8);
    },

    // Get timeline data organized by year
    getTimelineData() {
        const timeline = {};
        
        this.events.forEach(event => {
            if (!timeline[event.year]) {
                timeline[event.year] = [];
            }
            timeline[event.year].push(event);
        });

        return timeline;
    }
};

// Make data available globally
window.mockData = mockData;
