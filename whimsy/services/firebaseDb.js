//USER COLLECTION
//================================================================

import { Timestamp, addDoc, collection, doc, setDoc, getDocs, orderBy, query, where, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
// import { uploadToStorage } from "./firebaseStorage";


//Create user in db
export const createUserInDb = async (username, email, userId, role) => {
  try {
    // Create a user object with the provided data
    const user = {
      username: username,
      email: email,
      userId: userId,
      role: role // Save the provided role to the user object
    };

    // Save the user object to the "users" collection in Firestore
    const userRef = doc(collection(db, "users"), userId);
    await setDoc(userRef, user);

    console.log("User created in the database successfully");
  } catch (error) {
    console.log("Something went wrong during user creation: " + error);
  }
};

export const getUserRoleFromDatabase = async (userId) => {
  try {
    const userDocRef = doc(collection(db, "users"), userId); // Replace "users" with the appropriate collection name
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      //console.log(userData.role);
      return userData.role;
    } else {
      console.log("User document not found");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving user role from the database: " + error);
    return null;
  }
};

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
    const storyRef = doc(db, "bookmarks", storyId);
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
  console.log("Likes: " +!querySnapshot.empty);
  return !querySnapshot.empty;
};


//==============================================================================
//Drafts
export const getCurrentUserDrafts = async (userId) => {
  try {
      var stories = []
      const snapshot = await getDocs(query(collection(db, "drafts"),where("userId", "==", userId)))
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

//================================================================================
//Feature stories:

export const addStoryToFeaturedCollection = async (storyId) => {
  try {
    const storyRef = doc(db, "stories", storyId);
    const snapshot = await getDoc(storyRef);
    const data = snapshot.data();
    
    // Add the user ID and story ID to the bookmarked data
    const bookmarkedData = {
      ...data,
      storyId: storyId
    };
    
    const docRef = await addDoc(collection(db, 'featured'), bookmarkedData);
    console.log('Added story to featured successfully...', docRef.id);
  } catch (error) {
    console.log('Something went wrong: ' + error);
  }
};

  
export const removeStoryFromFeaturedCollection = async (userId, storyId) => {
  try {
    const userUid = userId;
    const featureQuery = query(
      collection(db, 'featured'),
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


  export const isStoryFeatured = async (userId, storyId) => {
    const userUid = userId;
    const featureQuery = query(
      collection(db, 'featured'),
      where('storyId', '==', storyId)
    );
  
    const querySnapshot = await getDocs(featureQuery);
    console.log(!querySnapshot.empty);
    return !querySnapshot.empty;
  };



export const getCurrentFeaturedStories = async () => {
  try {
      var stories = []
      const snapshot = await getDocs(query(collection(db, "featured"), orderBy("time","desc")))
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








  

 