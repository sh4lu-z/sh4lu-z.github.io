import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

export async function initFirebase() {
  if (firebaseApp) return { auth: firebaseAuth, db: firebaseDb };

  // Fetch the configuration file securely created during setup
  const res = await fetch('/firebase-applet-config.json');
  const fullConfig = await res.json();
  
  // Initialize Firebase using the configuration
  firebaseApp = initializeApp(fullConfig);
  // Need to provide the firestore database id if there is one
  firebaseDb = getFirestore(firebaseApp, fullConfig.firestoreDatabaseId);
  firebaseAuth = getAuth(firebaseApp);
  
  return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
}

// Re-export specific modules for convenience
export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc, serverTimestamp };
