import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

async function SignUpWithFacebook({ facebookSignup }) {
  const userData = {
    info: {},
    source: 'facebook',
  };

  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    // console.log(`Result -> ${{ result }}`);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log(`Data -> ${{ data }}`);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    } else {
      // console.log(data);
      userData.info = data;
      await facebookSignup(userData);
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log(facebookCredential);
    // console.log(`Facebook Credentials -> ${facebookCredential}`);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(facebookCredential);
    console.log(`Res -> ${res}`);
  } catch (e) {
    console.log(e);
  }
}

export default SignUpWithFacebook;
