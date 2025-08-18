import { inject, Injectable } from '@angular/core';
import {  getDoc,  } from 'firebase/firestore';
import { addDoc, collection, Firestore, deleteDoc, doc, onSnapshot,updateDoc } from '@angular/fire/firestore';
import { CarData } from '../interfaces/carinterface';
import { from, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CarService {
  firestore = inject(Firestore)
  
 createCar(
  carData: CarData,
  userData: { userId: string }
) {
  const userCarsCollection = collection(this.firestore, 'cars');
  const carDataWithUser = { ...carData, userId: userData.userId, history: [] };

  console.log('Car object to be saved:', carDataWithUser);

  return addDoc(userCarsCollection, carDataWithUser);
}

  
 getCars(): Observable<CarData[]> {
  const carsCollection = collection(this.firestore, 'cars');

  return new Observable<CarData[]>((observer) => {
    const unsubscribe = onSnapshot(carsCollection, (snapshot) => {
      const cars = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as CarData)
      }));

      observer.next(cars);
    }, (error) => {
      observer.error(error);
    });

    // cleanup
    return () => unsubscribe();
  });
}
 getCar(carId: string): Observable<CarData> {
  const carDocRef = doc(this.firestore, `cars/${carId}`);

  return new Observable<CarData>((observer) => {
    const unsubscribe = onSnapshot(carDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const carData: CarData = { id: docSnapshot.id, ...(docSnapshot.data() as CarData) };
        observer.next(carData);
      } else {
        observer.error('Car not found');
      }
    }, (error) => {
      observer.error(error);
    });

   
    return () => unsubscribe();
  });
}
  async addUserToHistoryIfNotExists(carId: string, userId: string) {
    const carRef = doc(this.firestore, `cars/${carId}`);
    const carSnap = await getDoc(carRef);

    if (!carSnap.exists()) return;

    const carData = carSnap.data();
    const history: string[] = carData['history'] || [];

    if (!history.includes(userId)) {
      await updateDoc(carRef, {
        history: [...history, userId]
      });
    }
  
  }


updateCar(carId: string, updatedData: Partial<CarData>) {
  const carDoc = doc(this.firestore, `cars/${carId}`);
  return updateDoc(carDoc, updatedData); 
}

  
  

  deleteCar(userId: string, carId: string) {
    
    const carDoc = doc(this.firestore, `cars/${carId}`);
    return deleteDoc(carDoc);
  }

}
