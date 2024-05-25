document.addEventListener('DOMContentLoaded', () => {
    fetch('career_data.json')
        .then(response => response.json())
        .then(data => {
            window.careerData = data; // Store the data in a global variable
        })
        .catch(error => console.error('Error fetching career data:', error));
});

function generateRoadmap() {
    const year = parseInt(document.getElementById('year').value);
    const role = document.getElementById('role').value;
    const currentSkills = [];
    for (let i = 1; i <= 4; i++) {
        const skill = document.getElementById(`skills${i}`).value;
        if (skill !== "None") {
            currentSkills.push(skill.toLowerCase());
        }
    }
    const industry = document.getElementById('industry').value.trim();
    const interests = document.getElementById('interests').value.trim();
    const aspirations = document.getElementById('aspirations').value.trim();

    if (!window.careerData || !window.careerData[role]) {
        alert('Please select a valid role.');
        return;
    }

    const { skills, resources, projects } = window.careerData[role];

    const missingSkills = skills.filter(skill => !currentSkills.includes(skill.name.toLowerCase()));

    const roadmap = [
        {
            year: 'Second Year',
            tasks: [
                'Focus on foundational courses',
                `Learn basic ${skills.slice(0, 2).map(skill => `${skill.name} (${skill.duration})`).join(', ')}`,
                'Join relevant clubs and societies',
                `Develop projects such as ${projects[0].name} (${projects[0].duration})`
            ]
        },
        {
            year: 'Third Year',
            tasks: [
                `Fill skill gaps: ${missingSkills.slice(0, Math.ceil(missingSkills.length / 2)).map(skill => `${skill.name} (${skill.duration})`).join(', ')}`,
                `Work on intermediate projects like ${projects[1].name} (${projects[1].duration})`,
                'Take advanced courses in relevant subjects',
                'Internships and part-time jobs in relevant fields'
            ]
        },
        {
            year: 'Fourth Year',
            tasks: [
                `Fill remaining skill gaps: ${missingSkills.slice(Math.ceil(missingSkills.length / 2)).map(skill => `${skill.name} (${skill.duration})`).join(', ')}`,
                `Work on advanced projects like ${projects[2].name} (${projects[2].duration})`,
                'Participate in hackathons and competitions',
                'Prepare for campus placements',
                'Revise and strengthen core concepts'
            ]
        }
    ];

    // Save roadmap to localStorage
    localStorage.setItem('roadmap', JSON.stringify(roadmap));
    localStorage.setItem('resources', JSON.stringify(resources));

    // Redirect to another page (e.g., roadmap.html)
    window.location.href = 'roadmap.html';
}
