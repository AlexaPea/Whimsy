const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Clear bookmarks, likes, and stories on the first of each month
exports.clearData = functions.pubsub.schedule('0 0 1 * *').timeZone('Your_Timezone').onRun(async (context) => {
  try {
    const db = admin.firestore();

    // Clear bookmarks
    const bookmarksRef = db.collection('bookmarks');
    const bookmarksSnapshot = await bookmarksRef.get();
    const bookmarkDeletions = [];
    bookmarksSnapshot.forEach((doc) => {
      bookmarkDeletions.push(doc.ref.delete());
    });
    await Promise.all(bookmarkDeletions);

    // Clear likes
    const likesRef = db.collection('likes');
    const likesSnapshot = await likesRef.get();
    const likeDeletions = [];
    likesSnapshot.forEach((doc) => {
      likeDeletions.push(doc.ref.delete());
    });
    await Promise.all(likeDeletions);

    // Clear stories
    const storiesRef = db.collection('stories');
    const storiesSnapshot = await storiesRef.get();
    const storyDeletions = [];
    storiesSnapshot.forEach((doc) => {
      storyDeletions.push(doc.ref.delete());
    });
    await Promise.all(storyDeletions);

    console.log('Data cleared successfully');
    return null;
  } catch (error) {
    console.error('Error clearing data:', error);
    return null;
  }
});
