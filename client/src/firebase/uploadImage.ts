import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { store } from "./firebase.config";

export const handleUploads = (imageUrls: any) => {
  return Promise.all(
    imageUrls.map((file: any) => {
      const imageRef = ref(store, `images/${file.name}`);

      return uploadBytes(imageRef, file).then((value: any) => {
        return getDownloadURL(value.ref);
      });
    })
  );
};
