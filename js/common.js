let socials = ["github", "twitter", "spigot"]

let socialLinks = ["https://github.com/LiamKinghouser", "https://twitter.com/liamkinghouser", "https://www.spigotmc.org/members/juvoo.987014/#resources"]

window.addEventListener('load', function() {
    setSocials()
})

function setSocials() {
    let socialsContainer = document.getElementById('socials-container')

    for (let i = 0; i < socials.length; i++) {
        let social = document.createElement('a')
        social.setAttribute('href', socialLinks[i])
        social.setAttribute('target', '_blank')
        social.classList.add('social-link')

        if (socials[i] === "spigot") {
            let icon = document.createElement('ion-icon')
            icon.setAttribute('src', '../images/icons/spigot.svg')

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