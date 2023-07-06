window.addEventListener('load', function() {
    setQuote()

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
})

function setQuote() {
    fetch('../data/strings/strings.json')
        .then(response => response.json())
        .then(data => {
            let p = document.querySelector('#header-container p')

            let a = document.createElement('a')
            a.setAttribute('href', data.index.quote_link)
            a.setAttribute('target', '_blank')
            a.textContent = data.index.quote

            p.appendChild(a)
        })
        .catch(error => console.log(error));
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