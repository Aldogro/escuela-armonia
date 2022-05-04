import React from 'react'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { FirestoreProvider, AuthProvider, useFirebaseApp } from 'reactfire'

import NavWrapper from 'components/NavWrapper'

import Routing from 'routes/Routing'

const App = () => {
  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth(firebaseApp)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <NavWrapper>
          <React.Suspense fallback={<div>Loading</div>}>
            <Routing />
          </React.Suspense>
        </NavWrapper>
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default App