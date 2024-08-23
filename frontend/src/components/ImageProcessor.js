function uploadUserImage() {
    // Firebase configuration for your web app
    const firebaseConfig = {
        apiKey: "AIzaSyD3hUpNFgAwXxlpsGs2sfI6Fgp3MOgXanA",
        authDomain: "hoversprite-3d6b3.firebaseapp.com",
        projectId: "hoversprite-3d6b3",
        storageBucket: "hoversprite-3d6b3.appspot.com",
        messagingSenderId: "375398691957",
        appId: "1:375398691957:web:ce8d343181d0e843cef43c",
        measurementId: "G-M1Q0WXPBE6"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const storage = firebase.storage();

    const file = document.querySelector("#profileImageUpload").files[0];
    if (!file) return Promise.resolve(null); // If no file is selected, resolve to null

    const ref = storage.ref();
    const name = +new Date() + "-" + file.name;
    const metadata = { contentType: file.type };
    const task = ref.child(name).put(file, metadata);

    return task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(console.error);
}

uploadUserImage();