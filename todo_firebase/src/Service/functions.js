import auth from '@react-native-firebase/auth';
export const logout = () => auth()
    .signOut()
    .then(() => {
        console.log('User signed out!')
    });