import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, doc, deleteDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

let firebaseConfig = null;

export async function initFirebase() {
  if (firebaseConfig) return { auth, db };

  // Fetch the configuration file securely created during setup
  const res = await fetch('/firebase-applet-config.json');
  const fullConfig = await res.json();
  
  // Initialize Firebase using the configuration
  const app = initializeApp(fullConfig);
  // Need to provide the firestore database id if there is one
  const db = getFirestore(app, fullConfig.firestoreDatabaseId);
  const auth = getAuth(app);
  
  return { app, auth, db };
}

// Re-export specific modules for convenience
export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, query, onSnapshot, orderBy, doc, deleteDoc, serverTimestamp };
