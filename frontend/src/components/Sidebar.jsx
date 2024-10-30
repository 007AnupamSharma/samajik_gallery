import React, { useState,useEffect } from "react";
import ImageUploader from "./ImageUploader";

function Sidebar() {
  const [images, setImages] = useState([]);
  // const [name, setName] = useState("");
  const [tag, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };


  const handleAddTag = () => {
    if (newTag && !tag.includes(newTag)) {
      setTags([...tag, newTag]);
      setNewTag(""); // Clear input after adding
    }
  }

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

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  images.forEach((file) => formData.append('images', file));
  formData.append('tagName', selectedTag);
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
    
    <div className=" flex-col sticky bg-zinc-800 px-3 py-2 m-3 mt-24 rounded-lg w-1/4 h-screen justify-items-center">
      <div>
        <h2 className="text-white font-bold text-center text-xl mb-3 p-2">
          Upload Image
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex-col text-center">
          {/* <label htmlFor="imageName" className="text-white mb-2">
            Image Name
          </label>
          <input
            type="text"
            onChange={(e) => [setName(e.target.value)]}
            id="ImageName"
            value={name}
            required
            className="mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          /> */}

          <label htmlFor="tagName" className="text-white ">
            Image Tag
          </label>
          <select
            id="tagSelect"
            name="imageTag"
            onChange={(e) => {
              setSelectedTag(e.target.value);
            }}
            value={selectedTag}
            className="mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="" className="text-white ">
              Select a Tag
            </option>
            {tag.map((tag, index) => (
              <option value={tag} key={index} className="text-white">
                {tag}
              </option>
            ))}
          </select>

          <label htmlFor="uploadImage" className="text-white mb-2">
            Select Images
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            id="ImageName"
            required
            className="mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          <div className="flex-col  justify-items-center">
            <h6 className=" text-gray-400 text-center font-semibold text-sm ">
              {" "}
              Create your tag if it doesn't exist!
            </h6>
            <input
              type="text"
              
              id="newTag"
              className="mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              onChange={(e) => {
                setNewTag(e.target.value);
              }}
              placeholder="Add new tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add Tag
            </button>
          </div>
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-5 rounded"
          >
            Submit
          </button>
        </form>
        <p>{uploadMessage}</p>
      </div>
    </div>
  );
}

export default Sidebar;








