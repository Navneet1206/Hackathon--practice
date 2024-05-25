let careerData;

        // Load the JSON file
        fetch('career_data.json')
            .then(response => response.json())
            .then(data => careerData = data);

        function generateRoadmap() {
            const year = document.getElementById('year').value;
            const career = document.getElementById('career').value;

            const roadmap = document.getElementById('roadmap');
            roadmap.innerHTML = '';  // Clear previous roadmap

            if (careerData.careers[career]) {
                const careerInfo = careerData.careers[career];
                
                // Display Career Info
                let content = `<h2>Roadmap for ${career.replace('_', ' ')}</h2>`;
                content += `<h3>Skills to Learn:</h3><ul>`;
                careerInfo.skills.forEach(skill => content += `<li>${skill}</li>`);
                content += `</ul>`;

                content += `<h3>Technologies to Master:</h3><ul>`;
                careerInfo.technologies.forEach(tech => content += `<li>${tech}</li>`);
                content += `</ul>`;

                content += `<h3>Recommended Projects:</h3><ul>`;
                careerInfo.projects.forEach(project => content += `<li>${project}</li>`);
                content += `</ul>`;

                content += `<h3>Learning Resources:</h3><ul>`;
                content += `<li><strong>Courses:</strong><ul>`;
                careerInfo.resources.courses.forEach(course => content += `<li>${course}</li>`);
                content += `</ul></li>`;

                content += `<li><strong>Books:</strong><ul>`;
                careerInfo.resources.books.forEach(book => content += `<li>${book}</li>`);
                content += `</ul></li></ul>`;

                // Adjust timeline based on current year
                content += `<h3>Personalized Timeline:</h3><ul>`;
                const timeline = generateTimeline(year, careerInfo);
                timeline.forEach(item => content += `<li>${item}</li>`);
                content += `</ul>`;

                roadmap.innerHTML = content;
            } else {
                roadmap.innerHTML = '<p>Sorry, no data available for the selected career path.</p>';
            }
        }

        function generateTimeline(year, careerInfo) {
            const timeline = [];
            const totalYears = 4;
            const currentYear = parseInt(year);
            const remainingYears = totalYears - currentYear;

            // Divide the skills, technologies, and projects over the remaining years
            const skillsPerYear = Math.ceil(careerInfo.skills.length / remainingYears);
            const techsPerYear = Math.ceil(careerInfo.technologies.length / remainingYears);
            const projectsPerYear = Math.ceil(careerInfo.projects.length / remainingYears);

            for (let i = currentYear; i <= totalYears; i++) {
                let yearContent = `Year ${i} - Focus on:`;
                timeline.push(yearContent);

                const skills = careerInfo.skills.splice(0, skillsPerYear);
                const techs = careerInfo.technologies.splice(0, techsPerYear);
                const projects = careerInfo.projects.splice(0, projectsPerYear);

                if (skills.length) timeline.push(`Skills: ${skills.join(', ')}`);
                if (techs.length) timeline.push(`Technologies: ${techs.join(', ')}`);
                if (projects.length) timeline.push(`Projects: ${projects.join(', ')}`);
            }

            return timeline;
        }