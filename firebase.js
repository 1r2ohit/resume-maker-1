const firebaseConfig = {
  apiKey: 'AIzaSyCOFBHcb219f__ZUqh-f7RR398fh0uOmws',
  authDomain: 'resume-3e696.firebaseapp.com',
  projectId: 'resume-3e696',
  storageBucket: 'resume-3e696.appspot.com',
  messagingSenderId: '42069345364',
  appId: '1:42069345364:web:1bee356ada4bdc3f2a59c1',
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
    var res = await db.collection('resumes').doc(id).get();
    return res.data();
}