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

    document.addEventListener("scroll", (event) => {
        
    })
}

function scrollDown() {
    scroll({
        top: $(document).height(),
        behavior: "smooth"
    });
}

function updatePluginDownloads() {
    let downloads = getTotalPluginDownloads().toString()



    setInterval(updatePluginDownloads, 5000)
}

async function getTotalPluginDownloads() {
    let url = 'https://api.spiget.org/v2/authors/987014/resources?size=10000'

    try {
        let response = await fetch(url, {})
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
        console.log(downloads)

        return downloads
    } catch (error) {
        console.error(error)
    }
}