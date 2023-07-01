let socials = ["github", "twitter", "spigot"]

let socialLinks = ["https://github.com/LiamKinghouser", "https://twitter.com/liamkinghouser", "https://www.spigotmc.org/members/juvoo.987014/#resources"]

let projects = []

let lastRandomProjectShown = undefined

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
        social.classList.add('social-link')

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
    let projectsContainer = document.getElementById('projects-container')

    fetch('./projects/projects.json')
        .then(response => response.json())
        .then(data => {
            let projectsData = data.projects

            for (let i = 0; i < projectsData.length; i++) {
                // create project object with json data
                let projectData = projectsData[i]

                // create project element
                let projectElement = document.createElement('div')
                projectElement.classList.add('project')

                // create project content element
                let projectContent = document.createElement('div')
                projectContent.classList.add('project-content')

                // create title, snippet, and read more elements
                let projectTitle = document.createElement('div')
                projectTitle.classList.add('project-title')

                let projectSnippet = document.createElement('div')
                projectSnippet.classList.add('project-snippet')

                let projectReadMore = document.createElement('ion-icon')
                projectReadMore.setAttribute('name', 'expand-outline')
                projectReadMore.classList.add('project-read-more')

                // create new project object
                let project = new Project(projectData.name, projectData.snippet, projectData.description, projectData.images)
                projects.push(project)

                // add on click listener to read more button
                projectReadMore.onclick = function() {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    openProjectPopup(project)
                }

                projectTitle.innerHTML = project.getName()
                projectSnippet.innerHTML = project.getSnippet()

                projectReadMore.innerText = 'Read More'

                projectsContainer.appendChild(projectElement)

                projectElement.appendChild(projectContent)

                projectContent.appendChild(projectTitle)
                projectContent.appendChild(projectSnippet)
                projectContent.appendChild(projectReadMore)
            }
        })
        .catch(error => console.log(error));
}

// TODO: fix
function openRandomProject() {
    // initialize indexes array
    let indexes = []

    // fill indexes with all indexes of projects
    for (let i = 0; i < projects.length; i++) {
        indexes.push(i)
    }

    /*
     if not first time showing random project, remove the last shown project index from indexes
     so that no project is shown twice in a row
     */
    if (lastRandomProjectShown !== undefined) {
        console.log('wont show: ' + projects[lastRandomProjectShown].getName())
        indexes.splice(indexes.indexOf(lastRandomProjectShown, 1))
    }

    // set projectIndex to a project in projects with a random index from indexes
    let projectIndex = indexes[Math.floor(Math.random() * indexes.length)]

    // set project to project at projectIndex in projects
    let project = projects[projectIndex]

    // set last random project shown to project index
    lastRandomProjectShown = projectIndex

    // open project popup with random project
    openProjectPopup(project)
}

function openProjectPopup(project) {
    let projectPopup = document.getElementById('project-popup')

    let projectPopupImageContainer = document.getElementById('project-popup-image-container')
    let projectImage = projectPopupImageContainer.querySelector('img')
    projectImage.src = project.getImages()[0]

    let projectPopupDescriptionContainer = document.getElementById('project-popup-description-container')
    projectPopupDescriptionContainer.innerText = project.getDescription()

    projectPopup.style.display = 'flex'
    document.getElementById('page-content').style.opacity = '25%';
}

function closeProjectPopup() {
    document.getElementById('project-popup').style.display = 'none'
    document.getElementById('page-content').style.opacity = '100%';
}

class Project {

    constructor(name, snippet, description, images) {
        this.name = name;
        this.snippet = snippet;
        this.description = description;
        this.images = images;
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

    getImages() {
        return this.images;
    }
}