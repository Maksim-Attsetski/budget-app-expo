import {
  doc,
  setDoc,
  WhereFilterOp,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  FieldPath,
  deleteDoc,
  orderBy,
  limit,
  QueryFilterConstraint,
  and,
  getCountFromServer,
  addDoc,
  OrderByDirection,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

import { fbStore } from '../../config';

export type TCollectionId =
  | 'zefirka-clients'
  | 'zefirka-history'
  | 'zefirka-orders'
  | 'zefirka-recipes'
  | 'zefirka-version'
  | 'zefirka-setting'
  | 'zefirka-budget';

export const useFirestore = (collectionId: TCollectionId) => {
  const add = async (id: string, data: any) => {
    try {
      const ref = doc(fbStore, collectionId, id);
      await setDoc(ref, data);
    } catch (error) {
      throw error;
    }
  };

  const addWithId = async (
    data: any,
    field: string = 'uid'
  ): Promise<string> => {
    try {
      const ref = collection(fbStore, collectionId);
      const newDoc = await addDoc(ref, data);
      await updateDoc(doc(fbStore, collectionId, newDoc.id), {
        [field]: newDoc.id,
      });
      return newDoc.id;
    } catch (error) {
      throw error;
    }
  };

  const update = async (id: string, data: any) => {
    try {
      const ref = doc(fbStore, collectionId, id);
      await updateDoc(ref, data);
    } catch (error) {
      throw error;
    }
  };

  async function get<D = User>(
    field?: keyof D,
    divider?: WhereFilterOp,
    value?: any,
    orderByVal?: keyof D,
    limitVal?: number,
    directionStr?: OrderByDirection
  ) {
    const q =
      field && divider
        ? query(
            collection(fbStore, collectionId),
            where(field as string | FieldPath, divider, value),
            orderBy(orderByVal as string | FieldPath, directionStr ?? 'asc'),
            limit(limitVal ?? 10)
          )
        : query(collection(fbStore, collectionId));
    try {
      const querySnapshot = await getDocs(q);
      const result: any[] = [];

      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function getAll(whereArr: QueryFilterConstraint[], limitVal?: number) {
    const q = query(
      collection(fbStore, collectionId),
      and(...whereArr),
      limit(limitVal ?? 10)
    );
    try {
      const querySnapshot = await getDocs(q);
      const result: any[] = [];
      const allData = await getCountFromServer(
        query(collection(fbStore, collectionId), and(...whereArr), limit(999))
      );

      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      return { result, count: allData.data().count };
    } catch (error) {
      throw error;
    }
  }

  const remove = async (ids: string): Promise<void> => {
    try {
      const ref = doc(fbStore, collectionId, ids);
      await deleteDoc(ref);
    } catch (error) {
      throw error;
    }
  };

  return { add, addWithId, update, get, remove, getAll };
};
