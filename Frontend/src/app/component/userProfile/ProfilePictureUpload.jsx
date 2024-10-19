import React, { useState } from 'react';
import { useSelector } from '../../../api/hook';
import styles from '../../../styles/navbar.module.css';

const ProfilePictureUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const username= useSelector((state) => state.auth.user.user.username);
  const email= useSelector((state) => state.auth.user.user.email);
  const firstName = useSelector((state) => state.auth.user?.firstName);
  const lastName = useSelector((state) => state.auth.user?.lastName);
  
  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  // Function to handle image upload (optional if uploading to server)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      // Here, you can handle the image upload logic, such as sending it to the server
      console.log('Image uploaded:', selectedImage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{display:"flex",alignItems:"center", columnGap:"20px"}}>
        <div>
      <img
          src={`https://ui-avatars.com/api/?background=2F2CD8&color=fff&name=${firstName}+${lastName}`}
          alt=""
          className={styles.profile}
        />
      </div>
      <div>
        <div>
            {username}
        </div>
        Max file size is 20mb
      </div>
      </div>
      <div style={{marginBottom:"30px", marginTop:"30px"}}> 
      <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <button style={{backgroundColor:"blue",
        padding:"15px",
        border:"none",
        color:"white",
        display:"flex",
        justifyContent:"center",
        paddingLeft:"40px",
        paddingRight:"40px",
        borderRadius:"5px"
        }} type="submit">
            Save
            </button>
        </div>
      </form>

      {imagePreviewUrl && (
        <div>
          <h3>Preview:</h3>
          <img src={imagePreviewUrl} alt="Profile Preview" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        </div>
      )}
      
    </div>
  );
};

export default ProfilePictureUpload;
