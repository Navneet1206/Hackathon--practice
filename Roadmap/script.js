document.addEventListener('DOMContentLoaded', () => {
    fetch('career_data.json')
        .then(response => response.json())
        .then(data => {
            window.careerData = data; // Store the data in a global variable
        })
        .catch(error => console.error('Error fetching career data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const skillSelects = document.querySelectorAll('.skills');

    skillSelects.forEach(select => {
        select.addEventListener('change', () => {
            updateSkillOptions();
        });
    });

    function updateSkillOptions() {
        const selectedSkills = Array.from(skillSelects).map(select => select.value).filter(value => value !== "");

        skillSelects.forEach(select => {
            const previousSelectedOption = select.getAttribute('data-previous');

            if (previousSelectedOption && previousSelectedOption !== "") {
                skillSelects.forEach(otherSelect => {
                    if (otherSelect !== select) {
                        const option = otherSelect.querySelector(`option[value="${previousSelectedOption}"]`);
                        if (option) {
                            option.disabled = false;
                        }
                    }
                });
            }

            const currentSelectedOption = select.value;
            if (currentSelectedOption && currentSelectedOption !== "") {
                skillSelects.forEach(otherSelect => {
                    if (otherSelect !== select) {
                        const option = otherSelect.querySelector(`option[value="${currentSelectedOption}"]`);
                        if (option) {
                            option.disabled = true;
                        }
                    }
                });
            }

            select.setAttribute('data-previous', currentSelectedOption);
        });
    }

    updateSkillOptions();
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

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    const { skills, resources, projects } = window.careerData[role];

    const missingSkills = skills.filter(skill => !currentSkills.includes(skill.name.toLowerCase()));

    const roadmap = [
        {
            year: 'First Year',
            tasks: [
                'Focus on foundational courses in computer science and programming.',
                'Join relevant clubs and societies to explore interests.',
                `Start learning basic ${skills.slice(0, 2).map(skill => `${skill.name} (${skill.duration}): ${skill.description}`).join(', ')}`,
                `Explore introductory projects like ${projects[0].name} (${projects[0].duration}): ${projects[0].description}`
            ]
        },
        {
            year: 'Second Year',
            tasks: [
                `Build on foundational knowledge with intermediate courses and projects.`,
                `Deepen skills in ${skills.slice(2, 4).map(skill => `${skill.name} (${skill.duration}): ${skill.description}`).join(', ')}`,
                `Engage in hands-on projects such as ${projects[1].name} (${projects[1].duration}): ${projects[1].description}`,
                'Consider internships or part-time jobs related to the field.'
            ]
        },
        {
            year: 'Third Year',
            tasks: [
                `Further develop expertise in ${skills.slice(4).map(skill => `${skill.name} (${skill.duration}): ${skill.description}`).join(', ')}`,
                `Work on advanced projects like ${projects[2].name} (${projects[2].duration}): ${projects[2].description}`,
                'Take advanced courses and explore specialized areas within the field.',
                'Seek research opportunities or collaborative projects.'
            ]
        },
        {
            year: 'Fourth Year',
            tasks: [
                `Prepare for transition to professional career through advanced study and practical experience.`,
                `Finalize skills with ${missingSkills.map(skill => `${skill.name} (${skill.duration}): ${skill.description}`).join(', ')}`,
                `Participate in hackathons and industry-related competitions.`,
                `Polish resume and portfolio; prepare for job interviews and career fairs.`,
                'Stay updated with industry trends and technologies.'
            ]
        }
    ];

    roadmap.forEach((stage, index) => {
        // Only append roadmap stages that are relevant to the current year and beyond
        if (year <= index + 1) {
            const stageDiv = document.createElement('div');
            stageDiv.innerHTML = `<h3>${stage.year}</h3><ul>${stage.tasks.map(task => `<li>${task}</li>`).join('')}</ul>`;
            timeline.appendChild(stageDiv);
        }
    });

    const resourcesDiv = document.createElement('div');
    resourcesDiv.innerHTML = `<h3>Recommended Resources</h3><ul>${resources.map(resource => `<li>${resource}</li>`).join('')}</ul>`;
    timeline.appendChild(resourcesDiv);

    // Redirect to generated_roadmap.html passing roadmap data as query parameter
    const urlParams = new URLSearchParams();
    urlParams.append('data', JSON.stringify(roadmap.filter((stage, index) => year <= index + 1)));
    window.location.href = `generated_roadmap.html?${urlParams.toString()}`;
}

