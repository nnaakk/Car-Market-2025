import { inject, Injectable } from '@angular/core';
import {  getDoc,  } from 'firebase/firestore';
import { addDoc, collection, Firestore, deleteDoc, doc, onSnapshot,updateDoc } from '@angular/fire/firestore';
import { MotoData } from '../interfaces/motointerface';
import { from, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class MotoService {
  firestore = inject(Firestore)
  
 createMoto(
  motoData:MotoData,
  userData: { userId: string }
) {
  const userMotosCollection = collection(this.firestore, 'motos');
  const motoDataWithUser = { ...motoData, userId: userData.userId, history: [] };

  console.log('Moltor object to be saved:', motoDataWithUser);

  return addDoc(userMotosCollection, motoDataWithUser);
}

  
 getMotos(): Observable<MotoData[]> {
  const motosCollection = collection(this.firestore, 'motos');

  return new Observable<MotoData[]>((observer) => {
    const unsubscribe = onSnapshot(motosCollection, (snapshot) => {
      const motos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as MotoData)
      }));

      observer.next(motos);
    }, (error) => {
      observer.error(error);
    });

    // cleanup
    return () => unsubscribe();
  });
}
 getMoto(motoId: string): Observable<MotoData> {
  const motoDocRef = doc(this.firestore, `motos/${motoId}`);

  return new Observable<MotoData>((observer) => {
    const unsubscribe = onSnapshot(motoDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const motoData: MotoData = { id: docSnapshot.id, ...(docSnapshot.data() as MotoData) };
        observer.next(motoData);
      } else {
        observer.error('Byke not found ');
      }
    }, (error) => {
      observer.error(error);
    });

   
    return () => unsubscribe();
  });
}
  async addUserToHistoryIfNotExists(motoId: string, userId: string) {
    const motoRef = doc(this.firestore, `motos/${motoId}`);
    const motoSnap = await getDoc(motoRef);

    if (!motoSnap.exists()) return;

    const motoData = motoSnap.data();
    const history: string[] = motoData['history'] || [];

    if (!history.includes(userId)) {
      await updateDoc(motoRef, {
        history: [...history, userId]
      });
    }
  
  }


updateMoto(motoId: string, updatedData: Partial<MotoData>) {
  const motoDoc = doc(this.firestore, `motos/${motoId}`);
  return updateDoc(motoDoc, updatedData);
}

  
  

  deleteMoto(userId: string, motoId: string) {
    
    const motoDoc = doc(this.firestore, `motos/${motoId}`);
    return deleteDoc(motoDoc);
  }

}
