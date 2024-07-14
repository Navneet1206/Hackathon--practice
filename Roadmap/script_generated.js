document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roadmapData = JSON.parse(decodeURIComponent(urlParams.get('data')));

    const timeline = document.getElementById('timeline');

    roadmapData.forEach(stage => {
        const stageDiv = document.createElement('div');
        stageDiv.innerHTML = `<h3>${stage.year}</h3><ul>${stage.tasks.map(task => `<li>${task}</li>`).join('')}</ul>`;
        timeline.appendChild(stageDiv);
    });

    const resourcesDiv = document.createElement('div');
    resourcesDiv.innerHTML = `<h3>Recommended Resources</h3><ul>${roadmapData[roadmapData.length - 1].resources.map(resource => `<li>${resource}</li>`).join('')}</ul>`;
    timeline.appendChild(resourcesDiv);
});
