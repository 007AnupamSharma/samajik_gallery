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
        <div className='max-h-screen overflow-y-auto w-full content-betweeen bg-gradient-to-r from-slate-900 to-slate-700 mt-24 m-3 p-3 rounded-lg'>
            <div className='flex text-white text-md justify-center gap-5'>
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        className='p-3 hover:bg-gray-500 rounded-full font-thin bg-gray-700 shadow-lg border border-blue-300'
                        onClick={() => fetchImagesByTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '10px',
                    marginTop: '20px',
                    padding: '3px',
                }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Image ${index + 1}`}
                        loading="lazy"  // Add the loading attribute for lazy loading
                        className='w-full h-auto rounded-md object-cover aspect-[1/1]'
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
