import React, { useState, useEffect } from "react";

function AdminPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call to fetch images pending approval
        const fetchPendingImages = async () => {
            setLoading(true);
            setTimeout(() => {
                setImages([
                    { id: 1, url: "https://via.placeholder.com/150", name: "Sample Image 1" },
                    { id: 2, url: "https://via.placeholder.com/150", name: "Sample Image 2" },
                    { id: 3, url: "https://via.placeholder.com/150", name: "Sample Image 3" },
                ]);
                setLoading(false);
            }, 1000);
        };
        fetchPendingImages();
    }, []);

    const handleApprove = (id) => {
        // Handle image approval
        setImages(images.filter(image => image.id !== id));
        alert(`Image ${id} approved`);
    };

    const handleReject = (id) => {
        // Handle image rejection
        setImages(images.filter(image => image.id !== id));
        alert(`Image ${id} rejected`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Admin Approval Page</h1>
            {images.length === 0 ? (
                <p className="text-center text-gray-400">No images pending approval.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {images.map((image) => (
                        <div key={image.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-medium mb-2">{image.name}</h3>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleApprove(image.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(image.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPage;
