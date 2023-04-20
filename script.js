let socials = ["github", "twitter", "spigot"]

let socialLinks = ["https://github.com/LiamKinghouser", "https://twitter.com/liamkinghouser", "https://www.spigotmc.org/members/juvoo.987014/"]

window.onload = function() {
    let socialsContainer = document.getElementById('socials-container')

    for (let i = 0; i < socials.length; i++) {
        let social = document.createElement('a')
        social.setAttribute('class', 'social-link')
        social.setAttribute('href', socialLinks[i])
        social.setAttribute('target', '_blank')

        if (socials[i] === "spigot") {
            let button = document.createElement('button')
            let image = document.createElement('img')
            continue
        }

        let icon = document.createElement('ion-icon')
        icon.setAttribute('name', 'logo-' + socials[i])

        social.appendChild(icon)

        socialsContainer.appendChild(social)
    }
}