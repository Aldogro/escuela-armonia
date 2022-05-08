import React from 'react'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
import { FirestoreProvider, AuthProvider, useFirebaseApp, StorageProvider } from 'reactfire'

import NavWrapper from 'components/NavWrapper'
import LoadingFallback from 'components/LoadingFallback'

import Routing from 'routes/Routing'

const App = () => {
  const firebaseApp = useFirebaseApp()
  const firestoreInstance = getFirestore(useFirebaseApp())
  const auth = getAuth(firebaseApp)

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