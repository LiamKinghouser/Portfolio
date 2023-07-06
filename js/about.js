window.addEventListener('load', function() {
    setAboutTextSubSection()
})

function setAboutTextSubSection() {
    fetch('../data/strings/strings.json')
        .then(response => response.json())
        .then(data => {
            let aboutSubContainer = document.getElementsByClassName('about-sub-container')[0]

            let innerText = ''

            let aboutSubContainerText = document.createElement('p')

            let aboutFunFactsList = data.about_fun_facts_list

            for (let i = 0; i < aboutFunFactsList.length; i++) {
                innerText = innerText + aboutFunFactsList[i]
            }

            aboutSubContainerText.innerText = innerText
            aboutSubContainer.appendChild(aboutSubContainerText)
        })
        .catch(error => console.log(error))
}