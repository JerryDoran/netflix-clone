import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: null,
});

export const movieState = atom({
  key: 'movieState',
  default: null,
});
