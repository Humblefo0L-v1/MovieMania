import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDOedaiWZKvji0USMHVTs8JuM-BW02pZDw",
authDomain: "moviemania-a5525.firebaseapp.com",
projectId: "moviemania-a5525",
storageBucket: "moviemania-a5525.appspot.com",
messagingSenderId: "555182943482",
appId: "1:555182943482:web:b4b0ba89fdcc506e96ed43",
measurementId: "G-N62DTTL14Z"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);