window.onload = function() {
    let social = document.createElement('a')
    social.classList.add('social-link')
    social.setAttribute('href', 'https://twitter.com/liamkinghouser')
    social.setAttribute('target', '_blank')

    document.getElementById('socials-container').appendChild(social)

    let icon = document.createElement('ion-icon')
    icon.setAttribute('name', 'logo-twitter')

    social.appendChild(icon)
    social.appendChild(icon.cloneNode())
}
