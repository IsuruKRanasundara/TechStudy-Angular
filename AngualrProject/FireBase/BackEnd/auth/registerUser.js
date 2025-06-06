import * as admin from 'firebase-admin';

export const registerUser = async (data, context) => {
  const { email, password } = data;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    return { uid: userRecord.uid };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new functions.https.HttpsError('internal', 'Error creating user');
  }
};

// Note: Ensure that Firebase Admin SDK is initialized in your project