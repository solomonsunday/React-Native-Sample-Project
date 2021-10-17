import Firebase from './firebaseConfig';

export const AddUser = async (name,uid,image) => {
    try {
        return await Firebase
            .database()
            .ref("users/" + uid)
            .set({
                name: name,
                uuid: uid,
                image: image
            });
    } catch (error) {
        return error;
    }
}



export const UpdateUserImage = async (image, uid) => {
    try {
        return await Firebase
            .database()
            .ref("users/" + uid)
            .update({
                image:image
            })
    } catch (error) {
        return error;
    }
}
