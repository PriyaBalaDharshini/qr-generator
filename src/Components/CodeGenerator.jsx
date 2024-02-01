import React, { useState } from 'react';

function CodeGenerator() {

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("https://github.com/PriyaBalaDharshini");
    const [size, setSize] = useState("150");

    async function handleGenerate() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(link)}`;
            setImage(url);
        } catch (error) {
            console.log("Error Generation QR Code", error);
        }
        setLoading(false);
    }

    function handleDownload() {
        if (image) {
            fetch(image)
                .then((response) => response.blob())
                .then((blob) => {
                    const download = document.createElement("a");
                    download.href = URL.createObjectURL(blob);
                    download.download = "qrcode.png";
                    document.body.appendChild(download);
                    download.click();
                    document.body.removeChild(download);
                })
                .catch((error) => {
                    console.error("Error downloading image", error);
                });
        }
    }
    <div className="main"></div>

    return (

        <div className='code-container'>
            <h2 className='title'>QR CODE GENERATOR</h2>
            {loading && <p>Please wait.....</p>}
            {image && <img src={image} alt="" className="code-image" style={{ width: "200px", height: "200px" }} />}

            <div>
                {/* data for input */}
                <label htmlFor="dataInput" className='input-label'>
                    Data for QR Code:
                </label>
                <input
                    type="text"
                    id='dataInput'
                    placeholder="https://github.com/PriyaBalaDharshini"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                {/* for qr code size */}
                <label htmlFor="sizeInput" className='input-label'>
                    Image size (e.g. 150):
                </label>
                <input
                    type="text"
                    id='sizeInput'
                    placeholder="150"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <button className='generate-button'
                    disabled={loading}
                    onClick={handleGenerate}>
                    Generate QR Code
                </button>
                <button className='download-button'
                    onClick={handleDownload}>
                    Download QR Code
                </button>
            </div>
            <footer>
                <p>
                    Designed By{' '}
                    <a href="https://www.linkedin.com/in/priyadharshini-thirunavukkarasu-b1b615b4/">Priyadharshini T</a>
                </p>
            </footer>
        </div>

    );
}

export default CodeGenerator;
