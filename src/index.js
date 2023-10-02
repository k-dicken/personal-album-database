import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth"
import { getFirestore, getDoc, collection, addDoc, getDocs, where, doc, query } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC2sEQIJIDGQ_5jZM3gbe2ShBXtfOZrDco",
    authDomain: "kdicken-fb.firebaseapp.com",
    projectId: "kdicken-fb",
    storageBucket: "kdicken-fb.appspot.com",
    messagingSenderId: "637047845198",
    appId: "1:637047845198:web:d0bcad1853259ca49dee1f",
    measurementId: "G-PKR49KE1CL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function addButtonListener() {
    console.log("ARE YOU EVEN RUNINGGG", $("#buttons button").length);
    $("#buttons button").on("click", (e) => {
       console.log(e.currentTarget.id);
       getQuery(e.currentTarget.dataset.filter);
    })
    $("#showall").on("click", (e) => {
        console.log(e.currentTarget.id);
        getAllData();
     })
}
addButtonListener()

async function getAllData() {
    document.getElementById("albums").innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "album"));
    querySnapshot.forEach((doc) => {
        console.log("doc");
        document.getElementById("albums").innerHTML += `
        <div class="album">
        <p class="tag ${doc.data().genre}">${doc.data().genre}</p>
        <img src="${doc.data().image}" alt="Album cover of ${doc.data().name}">
            <div class="text">
                <h3 class="name">${doc.data().name}</h3>
                <p class="artist">${doc.data().artist}</p>
            </div>
        </div>
        `
    })
}
getAllData();

async function getQuery(genre) {
    console.log("query", genre);
    document.getElementById("albums").innerHTML = "";
    const q = query(collection(db, "album"), where("genre", "==", genre));
    // const q = Query(collection(db), where("genre", "==", query))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      document.getElementById("albums").innerHTML += `
      <div class="album">
      <p class="tag ${doc.data().genre}">${doc.data().genre}</p>
      <img src="${doc.data().image}" alt="Album cover of ${doc.data().name}">
          <div class="text">
              <h3 class="name">${doc.data().name}</h3>
              <p class="artist">${doc.data().artist}</p>
          </div>
      </div>
      `
    });
}