let socials = ["github", "twitter", "spigot"]

let socialLinks = ["https://github.com/LiamKinghouser", "https://twitter.com/liamkinghouser", "https://www.spigotmc.org/members/juvoo.987014/#resources"]

window.onload = function() {
    setSocials()
    setProjects()
}

function setSocials() {
    let socialsContainer = document.getElementById('socials-container')

    for (let i = 0; i < socials.length; i++) {
        let social = document.createElement('a')
        social.setAttribute('href', socialLinks[i])
        social.setAttribute('target', '_blank')
        social.setAttribute('class', 'social-link')

        if (socials[i] === "spigot") {
            let icon = document.createElement('ion-icon')
            icon.setAttribute('src', 'icons/spigot.svg')

            social.appendChild(icon)
            socialsContainer.appendChild(social)
            continue
        }
        let icon = document.createElement('ion-icon')
        icon.setAttribute('name', 'logo-' + socials[i])

        social.appendChild(icon)

        socialsContainer.appendChild(social)
    }
}

function setProjects() {
    let projectElements = document.getElementsByClassName('project')

    fetch('./projects/projects.json')
        .then(response => response.json())
        .then(data => {
            let projects = data.projects

            for (let i = 0; i < projects.length; i++) {
                let projectElement = projectElements[i]
                if (projectElement.childNodes.length === 0) continue;

                let projectContent = projectElement.children[0].children
                console.log(projectElement.children[0])
                let projectTitle = projectContent[0]
                let projectSnippet = projectContent[1]

                let project = new Project(projects[i].name, projects[i].snippet)

                projectTitle.innerText = project.getName()
                projectSnippet.innerText = project.getSnippet()
            }
        })
        .catch(error => console.log(error));
}

class Project {

    constructor(name, snippet, description) {
        this.name = name;
        this.snippet = snippet;
        this.description = description;
    }

    getName() {
        return this.name;
    }

    getSnippet() {
        return this.snippet;
    }

    getDescription() {
        return this.description;
    }
}

function openProjectPopup(element) {
    let projectPopup = document.getElementById('project-popup')
    projectPopup.style.display = 'flex'
    document.getElementById('page-content').style.opacity = '50%';
}

function closeProjectPopup() {
    document.getElementById('project-popup').style.display = 'none'
    document.getElementById('page-content').style.opacity = '100%';
}