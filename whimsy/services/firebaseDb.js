//USER COLLECTION
//================================================================

import { Timestamp, addDoc, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
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

//Story COLLECTION
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
        const snapshot = await getDocs(query(collection(db, "stories"), orderBy("time","desc")))
        snapshot.forEach((doc)=> {
            // console.log(doc.id, " => ", doc.data());
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
            // console.log(doc.id, " => ", doc.data());
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
  

  export const deleteStoryFromCollection = async (storyId) => {
    try {
      // Delete the story document from the "stories" collection
      await deleteDoc(doc(db, "stories", storyId));
      console.log("Story deleted successfully");

      onClose();
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  };


//Bookmarked
//================================================================================================
  
export const addStoryToBookmarkCollection = async (storyId, userId) => {
  try {
    const storyRef = doc(db, "stories", storyId);
    const snapshot = await getDoc(storyRef);
    const data = snapshot.data();
    
    // Add the user ID and story ID to the bookmarked data
    const bookmarkedData = {
      ...data,
      bookmarkedBy: userId,
      storyId: storyId
    };
    
    const docRef = await addDoc(collection(db, 'bookmarks'), bookmarkedData);
    console.log('Added story to bookmarks successfully...', docRef.id);
  } catch (error) {
    console.log('Something went wrong: ' + error);
  }
};


  
export const removeStoryFromBookmarkCollection = async (userId, storyId) => {
  try {
    const userUid = userId;
    const bookmarkQuery = query(
      collection(db, 'bookmarks'),
      where('bookmarkedBy', '==', userUid),
      where('storyId', '==', storyId)
    );
    const querySnapshot = await getDocs(bookmarkQuery);
    
    // Iterate over the matching bookmarks and delete each document
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    
    console.log("Bookmark(s) deleted successfully");
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
};


  export const isStoryBookmarked = async (userId, storyId) => {
    const userUid = userId;
    const bookmarkQuery = query(
      collection(db, 'bookmarks'),
      where('bookmarkedBy', '==', userUid),
      where('storyId', '==', storyId)
    );
  
    const querySnapshot = await getDocs(bookmarkQuery);
    console.log(!querySnapshot.empty);
    return !querySnapshot.empty;
  };
  
//Handle Votes
//================================================================================================
export const updateVotes = async (storyId, votes) => {
  try {
    const storyRef = doc(db, "stories", storyId);
    const snapshot = await getDoc(storyRef);
    const data = snapshot.data();

    // Merge the updated votes with the existing data
    const updatedData = {
      ...data,
      votes: votes,
    };

    await updateDoc(storyRef, {
      votes: votes
    });
  } catch (error) {
    console.log("Something went wrong in db: " + error);
    throw error;
  }
};

export const addLikesToCollection = async (storyId, userId) => {
  try {
    const likeData = {
      storyId: storyId,
      userId: userId,
    };

    const docRef = await addDoc(collection(db, 'likes'), likeData);
    console.log('Added like successfully...' + docRef.id);
  } catch (error) {
    console.log('Something went wrong: ' + error);
    throw error;
  }
};

export const removeLikesFromCollection = async (storyId, userId) => {
  try {
    const likesRef = collection(db, 'likes');
    const querySnapshot = await getDocs(likesRef);

    querySnapshot.forEach((doc) => {
      const likeData = doc.data();
      if (likeData.storyId === storyId && likeData.userId === userId) {
        deleteDoc(doc.ref);
        console.log('Removed like successfully...');
      }
    });
  } catch (error) {
    console.log('Something went wrong: ' + error);
    throw error;
  }
};

export const isStoryLiked = async (userId, storyId) => {
  const userUid = userId;
  const likeQuery = query(
    collection(db, 'likes'),
    where('userId', '==', userUid),
    where('storyId', '==', storyId)
  );

  const querySnapshot = await getDocs(likeQuery);
  console.log("Likes" +!querySnapshot.empty);
  return !querySnapshot.empty;
};






  

 