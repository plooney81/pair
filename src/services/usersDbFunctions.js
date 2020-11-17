import { db } from './firebase';
const usersDbRef = db.ref("users");

//? First parameter is the user data which we grab certain portions of and put them in the new user node
//? Second parameter is the initial group the user is added too.
export const signUpFunction = (userData, groupNumber=1) => {
    const {displayName, photoURL, email, uid} = userData.user;
    const returnData = {displayName, photoURL, email, uid};
    usersDbRef.child(`${uid}`).set({
        displayName,
        photoURL,
        email,
        uid,
        groups: [`group${groupNumber}`]
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
    const { uid } = userData.user;
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