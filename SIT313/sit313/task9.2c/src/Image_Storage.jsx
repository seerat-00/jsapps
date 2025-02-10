import React, {useState} from "react";
import { getDownloadURL, uploadBytes, ref  } from "firebase/storage";
import exportfirebase from "./firebase";

const Image = () => {
    const[image, setImage] = useState(null)
    const[error, setError] = useState('')

    const handleImageChange = (e) => {
        e.preventDefault();
        
        const selectFile = e.target.files[0];

        if(selectFile){
            if(selectFile.type === 'image/jpeg' || selectFile.type === 'image/jpg' || selectFile.type === 'image/png'){
                setImage(selectFile);
            }
            else{
                setError('Please enter a valid image file, that is .jpg, .png, .jpeg')
                setImage(null)
            }
        }
    };
    
    const handleimageUpload = async () => {
        if(!image){
            console.log('No file selected');
            return;
        }

        const imageRef = ref(exportfirebase.imageUpload, `images/${image.name}`)

        try{
            const snapshot = await uploadBytes(imageRef, image)
            if(snapshot){
                const url = await(getDownloadURL)(snapshot.ref)
                console.log('File uploaded successfully', url)
                //alert('File uploaded successfully')
            }
            else{
                setError('Error in uploading the file')
            }
        }
        catch(error){
            setError('Error in uploading the file')
        }
    };

    return(
        <div className="image__area">
        <input type="file" onChange={handleImageChange} style={{
            padding: '10px'
        }} />
        <button onClick={handleimageUpload} style={{
            padding: '10px 20px',
            backgroundColor: '#3b49df',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            marginLeft: '10px'
        }}>Upload</button>
        {error && <p style={{color: 'red', marginTop: '10px'}}>{error} </p>}
        </div>
    )
}

export default Image;