let socials = ["github", "twitter", "spigot"]

let socialLinks = ["https://github.com/LiamKinghouser", "https://twitter.com/liamkinghouser", "https://www.spigotmc.org/members/juvoo.987014/#resources"]

window.onload = function() {
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

    document.addEventListener("scroll", () => {
        let scrollDistance = getScrollDistance()
        if (scrollDistance <= 2) {
            window.requestAnimationFrame(function() {
                let element = document.getElementById('page-arrow')
                element.querySelector('ion-icon').setAttribute('name', 'chevron-down-outline')
                element.style.opacity = '100%'
            })
        }
        else if (scrollDistance >= 98) {
            window.requestAnimationFrame(function() {
                let element = document.getElementById('page-arrow')
                element.querySelector('ion-icon').setAttribute('name', 'chevron-up-outline')
                element.style.opacity = '100%'
            })
        }
        else {
            window.requestAnimationFrame(function() {
                document.getElementById('page-arrow').style.opacity = '0%'
            })
        }
    })

    updatePluginDownloads().then()
    setInterval(updatePluginDownloads, 5000)
}

function getScrollDistance() {
    let scrollDistance = document.scrollingElement.scrollTop;
    let pageHeight = document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight;
    return (scrollDistance / pageHeight) * 100;
}

function scrollArrow() {
    let name = document.getElementById('page-arrow').querySelector('ion-icon').getAttribute('name')
    let distance = 0
    if (name === 'chevron-down-outline') distance = $(document).height()
    scroll({
        top: distance,
        behavior: "smooth"
    })
}

async function updatePluginDownloads() {
    let downloads = await getTotalPluginDownloads()

    // put commas in downloads
    downloads = downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    let downloadsCountElement = document.getElementById('plugin-downloads-count')

    // if old downloads is different from new downloads
    let shouldAnimate = downloadsCountElement.innerText !== downloads

    if (shouldAnimate) downloadsCountElement.style.opacity = '0%'

    setTimeout(function () {
        downloadsCountElement.innerText = downloads.toString()
        if (shouldAnimate) downloadsCountElement.style.opacity = '100%'
    }, 500)
}

async function getTotalPluginDownloads() {
    let url = 'https://api.spiget.org/v2/authors/987014/resources?size=10000'

    try {
        let response = await fetch(url)
        let text = await response.text()

        let downloads = 0
        let strings = text.split('\"downloads\":')

        for (let pluginData of strings) {
            let pluginDownloads = ''
            let pluginDataSplit = pluginData.split(",")

            if (!isNaN(parseInt(pluginDataSplit[0]))) {
                pluginDownloads = pluginDataSplit[0].replace(",", "")
                downloads += parseInt(pluginDownloads)
            }
        }

        return downloads
    } catch (error) {
        console.error(error)
    }
}