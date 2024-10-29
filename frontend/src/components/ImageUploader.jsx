import React, { useState, useEffect } from 'react';

function ImageUploader() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [tagName, setTagName] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [tags, setTags] = useState([]);


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

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleTagChange = (e) => {
        setTagName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('images', file));
        formData.append('tagName', tagName);
        console.log(formData);

        try {
            const response = await fetch('http://localhost:8080/api/addTagImages', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUploadMessage('Images uploaded successfully!');
            } else {
                setUploadMessage(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            setUploadMessage('Error uploading images');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                    required
                />
                <select name="tagName" value={tagName} onChange={handleTagChange} required>
                    <option value="">Select a tag</option>
                    {tags.map((tag, index) => (
                        <option key={index} value={tag}>{tag}</option>
                    ))}
                </select>
                <button type="submit">Upload Images</button>
            </form>
            <p>{uploadMessage}</p>
        </div>
    );
}

export default ImageUploader;
