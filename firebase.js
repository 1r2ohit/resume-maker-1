
const firebaseConfig = {
    apiKey: "AIzaSyCGa6UpExfGMucPjfjHzxJFEB8O5cLOJOo",
    authDomain: "resume-maker-fdd1f.firebaseapp.com",
    projectId: "resume-maker-fdd1f",
    storageBucket: "resume-maker-fdd1f.appspot.com",
    messagingSenderId: "405170515548",
    appId: "1:405170515548:web:29a3bb1237bc1969e60099",
    measurementId: "G-1MEZ4VTGLF"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function saveResume(data) {
    if(!data["linkedin"]){
        return "E";
    }
    var doc = await db.collection('resumes').doc(data["linkedin"]).get();
    if (doc.exists) {
        var password = prompt('Your resume already exists please enter Password to save changes');
        var check = doc.data();
        if (password != check['password']) {
          return 'WP';
        }
    }else{
        var password = prompt('Choose Password');
    } 
    data['password'] = password;
    var ref = await db.collection('resumes').doc(data['linkedin']).set(data);
    return data["linkedin"];
}

async function getResume(id){
    $('header h1').html("Loading....")
    var res = await db.collection('resumes').doc(id).get();
    $('header h1').html('Resume Maker');
    return res.data();
}