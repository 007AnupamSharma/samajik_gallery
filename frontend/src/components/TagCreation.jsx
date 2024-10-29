import React, { useState } from 'react';

function TagCreation() {
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');

    const handleTagChange = (e) => {
        setTag(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/createTag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tag }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Tag created successfully!');
                setTag(''); // Clear input field after submission
            } else {
                setMessage(data.message || 'Failed to create tag');
            }
        } catch (error) {
            console.error('Error creating tag:', error);
            setMessage('Error creating tag');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter new tag"
                    value={tag}
                    onChange={handleTagChange}
                    required
                />
                <button type="submit">Create Tag</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TagCreation;
