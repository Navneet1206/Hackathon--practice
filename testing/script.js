document.addEventListener('DOMContentLoaded', () => {
    fetch('career_data.json')
        .then(response => response.json())
        .then(data => {
            window.careerData = data; // Store the data in a global variable
        })
        .catch(error => console.error('Error fetching career data:', error));
});

function generateRoadmap() {
    const year = document.getElementById('year').value;
    const role = document.getElementById('role').value.trim();
    const industry = document.getElementById('industry').value.trim();
    const interests = document.getElementById('interests').value.trim();
    const aspirations = document.getElementById('aspirations').value.trim();
    
    if (!window.careerData || !window.careerData[role]) {
        alert('Please enter a valid role.');
        return;
    }

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    const { skills, resources, projects } = window.careerData[role];

    const roadmap = [
        {
            year: 'Second Year',
            tasks: ['Focus on foundational courses', `Learn basic ${skills.join(', ')}`, 'Join relevant clubs and societies']
        },
        {
            year: 'Third Year',
            tasks: [`Work on intermediate projects like ${projects[0]}, ${projects[1]}`, `Take advanced courses on ${skills.slice(2).join(', ')}`, 'Internships and part-time jobs in relevant fields']
        },
        {
            year: 'Fourth Year',
            tasks: [`Work on advanced projects like ${projects[2]}`, 'Participate in hackathons and competitions', 'Prepare for campus placements', 'Revise and strengthen core concepts']
        }
    ];

    roadmap.forEach((stage, index) => {
        if (parseInt(year) <= index + 2) {
            const stageDiv = document.createElement('div');
            stageDiv.innerHTML = `<h3>${stage.year}</h3><ul>${stage.tasks.map(task => `<li>${task}</li>`).join('')}</ul>`;
            timeline.appendChild(stageDiv);
        }
    });

    const resourcesDiv = document.createElement('div');
    resourcesDiv.innerHTML = `<h3>Recommended Resources</h3><ul>${resources.map(resource => `<li>${resource}</li>`).join('')}</ul>`;
    timeline.appendChild(resourcesDiv);
}
