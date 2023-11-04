const mockups = []

window.addEventListener('load', function() {
    setMockups()
})

function setMockups() {
    let mockupsContainer = document.getElementById('mockups-container')

    fetch('mockups.json')
        .then(response => response.json())
        .then(data => {
            let mockups = data.mockups

            for (let i = 0; i < mockups.length; i++) {
                let mockup = mockups[i]
                let mockupID = mockup.id

                // create mockup element
                let mockupElement = document.createElement('div')
                mockupElement.classList.add('mockup')

                // create mockup content element
                let mockupContent = document.createElement('div')
                mockupContent.classList.add('mockup-content')

                // create title, snippet, and read more elements
                let mockupTitle = document.createElement('div')
                mockupTitle.classList.add('mockup-title')

                let mockupImageContainer = document.createElement('div')
                mockupImageContainer.classList.add('mockup-content-image-container')

                let mockupImage = document.createElement("img")
                mockupImage.src = "png/" + mockupID + ".png"

                // add on click listener to image
                mockupImage.onclick = function() {
                    window.open("https://liamkinghouser.com/external/png/" + mockupID + ".png", "_blank")
                }

                let mockupDownload = document.createElement('ion-icon')
                mockupDownload.setAttribute('name', 'download-outline')
                mockupDownload.classList.add('mockup-download')

                // add on click listener to download button
                mockupDownload.onclick = function() {
                    downloadMockup("https://liamkinghouser.com/external/" + mockupID + ".psd")
                }

                mockupTitle.innerHTML = mockupID

                mockupsContainer.appendChild(mockupElement)

                mockupElement.appendChild(mockupContent)

                mockupContent.appendChild(mockupTitle)
                mockupContent.appendChild(mockupDownload)

                mockupContent.appendChild(mockupImageContainer)
                mockupImageContainer.appendChild(mockupImage)
            }
        })
        .catch(error => console.log(error));
}

function downloadMockup(downloadLink) {
    const a = document.createElement('a');
    a.href = downloadLink
    console.log(downloadLink.split("/")[-1])
    a.download = downloadLink.split("/")[-1]

    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}