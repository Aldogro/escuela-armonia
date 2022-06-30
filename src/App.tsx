import React from 'react'

import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
import { FirestoreProvider, AuthProvider, useFirebaseApp, StorageProvider } from 'reactfire'
import { FirebaseApp } from 'firebase/app'

import NavWrapper from 'components/NavWrapper'
import LoadingFallback from 'components/LoadingFallback'

import Routing from 'routes/Routing'

const App = (): React.ReactElement => {
  const firebaseApp: FirebaseApp = useFirebaseApp()
  const firestoreInstance: Firestore = getFirestore(useFirebaseApp())
  const auth: Auth = getAuth(firebaseApp)

  return (
    <AuthProvider sdk={auth}>
      <StorageProvider sdk={getStorage(firebaseApp)}>
        <FirestoreProvider sdk={firestoreInstance}>
          <NavWrapper>
            <React.Suspense fallback={<LoadingFallback />}>
              <Routing />
            </React.Suspense>
          </NavWrapper>
        </FirestoreProvider>
      </StorageProvider>
    </AuthProvider>
  )
}

export default App