//USER COLLECTION
//================================================================

import { Timestamp, addDoc, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc } from "firebase/firestore"
import { db } from "../firebase"
// import { uploadToStorage } from "./firebaseStorage";


//Create user in db
export const createUserInDb = async (username, email, uid) => {
    console.log("Creating..");
    try {
        console.log("Creating user in db..." + uid);
        const docRef = await setDoc(doc(db, "users", uid), {
            username,
            email,
            role: "creator",
            createdAt: Timestamp.now()
        })

    } catch (e) {
        console.log("Something went wrong: " + e)
    }

}

//Projects COLLECTION
//================================================================


export const addBedTimeStoryToCollection = async (story) => {
  try {
    const docRef = await addDoc(collection(db, 'stories'), story);
    console.log('Added story successfully...' + docRef.id);
    // return true;
  } catch (error) {
    console.log('Something went wrong: ' + error);
    // return false;
  }
};

export const addDraftToCollection = async (story) => {
    try {
      const docRef = await addDoc(collection(db, 'drafts'), story);
      console.log('Added draft successfully...' + docRef.id);
      // return true;
    } catch (error) {
      console.log('Something went wrong: ' + error);
      // return false;
    }
  };

export const getAllStoriesFromCollection = async () => {
    try {
        var stories = []
        const snapshot = await getDocs(query(collection(db, "stories"), orderBy("title")))
        snapshot.forEach((doc)=> {
            console.log(doc.id, " => ", doc.data());
            stories.push({...doc.data(), id: doc.id})
        })
        return stories
    } catch (e) {
        console.log("Something went wrong: " + e)
        return []
    }
}

export const getCurrentUserStories = async (userId) => {
    try {
        var stories = []
        const snapshot = await getDocs(query(collection(db, "stories"),where("userId", "==", userId)))
        snapshot.forEach((doc)=> {
            console.log(doc.id, " => ", doc.data());
            stories.push({...doc.data(), id: doc.id})
        })
        return stories
    } catch (e) {
        console.log("Something went wrong: " + e)
        return []
    }
}

export const updateStory = async (storyId, title, body) => {
    try {
      const storyRef = doc(db, "stories", storyId);
      const snapshot = await getDoc(storyRef);
      const data = snapshot.data();
      
      // Merge the updated title and body with the existing data
      const updatedData = {
        ...data,
        title: title,
        story: body,
      };
      
      await setDoc(storyRef, updatedData);
    } catch (error) {
      console.log("Something went wrong in db: " + error);
      throw error; 
    }
  };
  

  

export const updateUserInDb = async (userInfo, userId) => {

}
