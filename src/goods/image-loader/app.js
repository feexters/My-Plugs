import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'

const firebaseConfig = {
    apiKey: "AIzaSyCgjObZ84wR22jVYx65Wqx-sJul2jvDchs",
    authDomain: "upload-images-bcccc.firebaseapp.com",
    projectId: "upload-images-bcccc",
    storageBucket: "upload-images-bcccc.appspot.com",
    messagingSenderId: "974451541376",
    appId: "1:974451541376:web:26261bbdc419eab9d9ed65"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()

///////////////////////////////////////////////

upload('#image-uploader', {
    multiple: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(images) {
        images.forEach((image, index) => {
            const ref = storage.ref(`images/${image.file.name}`)
            const task = ref.put(image.file)
            const $block = image.$prev.querySelector('.preview-info__progress')


            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                $block.textContent = percentage
                $block.style.width = percentage
            }, error => {
                console.error(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    const $openUrl = document.createElement('div')
                    $openUrl.classList.add('preview-image__open')
                    // $block.insertAdjacentElement('afterend', $openUrl)
                    $block.parentNode.insertAdjacentElement('afterend', $openUrl)
                    /* Add url for image */
                    $openUrl.insertAdjacentHTML(`afterbegin`, `
                        <a class="" href="${url}" target="_blank">Open URL</a>
                    `)
                })
            })
        })
    }
})