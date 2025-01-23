import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/productsSlice";

const firebaseConfig = {
  apiKey: "AIzaSyB1IY2X_ykOvcI4AO6FrI2jmaJ3T90_WRA",
  authDomain: "products-5cb56.firebaseapp.com",
  projectId: "products-5cb56",
  storageBucket: "products-5cb56.firebasestorage.app",
  messagingSenderId: "396267678321",
  appId: "1:396267678321:web:50a651b6f0792bd7d3c9d0",
  measurementId: "G-S0D1522Z43"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const productsRef = collection(db, "products");

export const useProductsListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return onSnapshot(productsRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data, createdAt: data.createdAt?.toDate() };
      });

      dispatch(setProducts(docs));
    });
  }, [dispatch]);
};
