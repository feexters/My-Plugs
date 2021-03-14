import firebase from 'firebase/app'

/*Initiali */
const storage = firebase.storage()
const imagesRef = storage.ref().child('images')

const imgURL = []

/* Get url for each of image */
export async function getImages() {
    /* Get list of images on the server */
    await imagesRef.listAll().then(async (res) => {
      for(const itemRef of res.items) {
        await itemRef.getDownloadURL()
          .then((url) => {
              imgURL.push(url)
            })
            .catch((error) => {
              console.error(error)
            })
      }
    })
    .catch((error) => {
      console.error(error)
    })
    return imgURL
}