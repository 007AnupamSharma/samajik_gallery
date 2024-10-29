import React, { useState, useEffect } from 'react';

function ImageGallery() {
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');


    // Fetch tags from backend when component mounts
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/getAllTags');
                const data = await response.json();

                if (data.success) {
                    setTags(data.data.tags); // Assuming the response format contains tags in data.tags
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    // Fetch images by tag when the button is clicked
    const fetchImagesByTag = async (tagName) => {
        try {
            const response = await fetch('http://localhost:8080/api/getTagImages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: tagName }), // Sending tag as JSON body
            });
            const data = await response.json();
            console.log("chalega");

            console.log(data);
            if (response.ok) {
                setImages(data.data.images); // Set images from the response
                setError('');
            } else {
                setImages([]);
                setError(data.message || 'Failed to fetch images');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('Error fetching images');
        }
    };

    const handleTagChange = (e) => {
        setTags(e.target.value);
    };

    const handleViewImages = () => {
        fetchImagesByTag(tags);
    };

    return (
        <div>
            <div>
                {tags.map((tag, index) => (
                    <button key={index} onClick={() => fetchImagesByTag(tag)}>
                        {tag}
                    </button>
                ))}
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                marginTop: '20px',
            }}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Image ${index + 1}`}
                        style={{
                            width: '100%', // Set to 100% of grid cell width
                            height: 'auto', // Adjust height automatically to maintain aspect ratio
                            borderRadius: '5px',
                            objectFit: 'cover',
                            aspectRatio: '1 / 1', // Maintain a 1:1 aspect ratio
                        }}
                    />
                ))}
            </div>

        </div>
    );
}


export default ImageGallery;
