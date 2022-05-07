import React from 'react'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { FirestoreProvider, AuthProvider, useFirebaseApp } from 'reactfire'

import NavWrapper from 'components/NavWrapper'
import LoadingFallback from 'components/LoadingFallback'

import Routing from 'routes/Routing'

const App = () => {
  const firebaseApp = useFirebaseApp()
  const firestoreInstance = getFirestore(useFirebaseApp())
  const auth = getAuth(firebaseApp)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <NavWrapper>
          <React.Suspense fallback={<LoadingFallback />}>
            <Routing />
          </React.Suspense>
        </NavWrapper>
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default App