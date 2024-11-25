document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'MeFYjbhL5btc7-c6CviQNTDXNRcn3q0PS6XAv82OBkA'; // Replace with your API key
    const apiUrl = `https://api.unsplash.com/photos/random?query=nature&count=20&client_id=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('abstract-gallery');
            data.forEach(image => {
                const card = document.createElement('div');
                card.classList.add('image-card');

                const img = document.createElement('img');
                img.src = image.urls.regular;
                img.alt = image.alt_description;

                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                overlay.innerHTML = `
                    <h3>${image.description || 'aabstract'}</h3>
                    <p>${image.alt_description || 'Beautiful abstract photography.'}</p>
                    <button class="download-btn">Download</button>
                `;

                const downloadBtn = overlay.querySelector('.download-btn');
                downloadBtn.addEventListener('click', function() {
                    downloadImage(image.links.download, image.id);
                });

                card.appendChild(img);
                card.appendChild(overlay);
                gallery.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
});

function downloadImage(url, filename) {
const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`; // Proxy to bypass CORS

fetch(proxyUrl)
    .then(response => response.blob())
    .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `${filename}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl); // Clean up
        a.remove(); // Remove the element after triggering the download
    })
    .catch(error => console.error('Error downloading image:', error));
}