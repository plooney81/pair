import { db } from './firebase';
const usersDbRef = db.ref("users");
export const pairLogoURL = 'https://firebasestorage.googleapis.com/v0/b/react-solo-project-pl.appspot.com/o/images%2Fdefault%2Fpair_logo.svg?alt=media&token=57fe59c4-2d31-4c3e-ba94-25872cc5b41f'

//? First parameter is the user data which we grab certain portions of and put them in the new user node
//? Second parameter is the initial group the user is added too.
export const signUpFunction = (userData) => {
    const {displayName, email, uid} = userData;
    let photoURL = userData.photoURL
    photoURL = photoURL ? photoURL : pairLogoURL;
    const returnData = {displayName, photoURL, email, uid};
    usersDbRef.child(`${uid}`).set({
        displayName,
        photoURL,
        email,
        uid
    }, error => {
        if(error){
            return error
        }else{
            return `Successful`
        }
    })
    return returnData
}

//? Function that first checks to see if the current UserId is in the db. 
//? If it isn't then it adds it, calling our function from above, if it does already exist, then we don't do anything.
export const signInFunction = (userData) => {
    const { uid } = userData;
    return usersDbRef.child(uid).once("value")
        .then((snapshot) => {
            // //! exists() method is part of the snapshot object which is returned by firebase queries
            if(snapshot.exists()){
                return snapshot.val()
            }else{
                signUpFunction(userData);
            }
        })
}