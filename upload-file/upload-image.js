const firebaseConfig = {
    apiKey: "AIzaSyDfuezToRsQ7MTlKifl6AcTSH-AnsEFvmE",
    authDomain: "cadezingmp3.firebaseapp.com",
    projectId: "cadezingmp3",
    storageBucket: "cadezingmp3.appspot.com",
    messagingSenderId: "1016061216025",
    appId: "1:1016061216025:web:0061c3dcadd96cd4d47188",
    measurementId: "G-DRSDWS5BYH"
};
firebase.initializeApp(firebaseConfig);

var image = '';
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'images';

// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function (e) {

    // what happened
    console.log('file upload event', e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            var downloadURL = uploadTask.snapshot.downloadURL;
            image = downloadURL;
            console.log('downloadURL ===>', downloadURL);
            let divLocation = document.getElementById("imgDiv");
            let imgElement = document.createElement("img");
            imgElement.src = downloadURL
            imgElement.width = 100;
            imgElement.height = 100;
            console.log('pic ==', downloadURL)
            divLocation.append(imgElement);
        });

});

function resultImage(){
    console.log('image resulte -->', image)
    return image;
}