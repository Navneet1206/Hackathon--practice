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
    const currentSkills = Array.from(document.getElementById('skills').selectedOptions).map(option => option.value.toLowerCase());
    const industry = document.getElementById('industry').value.trim();
    const interests = document.getElementById('interests').value.trim();
    const aspirations = document.getElementById('aspirations').value.trim();
    
    if (!window.careerData || !window.careerData[role]) {
        alert('Please select a valid role.');
        return;
    }

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

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

    roadmap.forEach((stage, index) => {
        if (year <= index + 2) {
            const stageDiv = document.createElement('div');
            stageDiv.innerHTML = `<h3>${stage.year}</h3><ul>${stage.tasks.map(task => `<li>${task}</li>`).join('')}</ul>`;
            timeline.appendChild(stageDiv);
        }
    });

    const resourcesDiv = document.createElement('div');
    resourcesDiv.innerHTML = `<h3>Recommended Resources</h3><ul>${resources.map(resource => `<li>${resource}</li>`).join('')}</ul>`;
    timeline.appendChild(resourcesDiv);
}
