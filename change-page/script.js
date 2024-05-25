document.addEventListener('DOMContentLoaded', () => {
    fetch('career_data.json')
        .then(response => response.json())
        .then(data => {
            window.careerData = data; // Store the data in a global variable
        })
        .catch(error => console.error('Error fetching career data:', error));

    // Theme switcher initialization
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
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

/*==================== DARK LIGHT THEME ====================*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
