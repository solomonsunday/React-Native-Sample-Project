import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

async function SignUpWithApple({ appleSignup }) {
  const userData = {
    email: '',
    fName: '',
    sName: '',
    source: 'apple',
    token: '',
  };
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    } else {
      const {
        email,
        identityToken,
        fullName,
        nonce,
      } = await appleAuthRequestResponse;
      userData.email = email;
      userData.fName = fullName.givenName;
      userData.sName = fullName.familyName;
      userData.token = identityToken;

      const appleCredential = await auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      await appleSignup(userData);

      // Sign the user in with the credential
      // return auth().signInWithCredential(appleCredential);
    }
  } catch (err) {
    console.log('err -> ' + err);
  }
}

export default SignUpWithApple;
