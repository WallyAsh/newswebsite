import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

// Function to upload JSON to Firebase Storage
const uploadJson = async (jsonData, fileName) => {
    try {
        const storageRef = ref(storage, `json_files/${fileName}`);
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading JSON file:', error);
    }
};

export default uploadJson;