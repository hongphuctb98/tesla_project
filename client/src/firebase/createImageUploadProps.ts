import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { RcFile } from "antd/es/upload";
import { message } from "antd";
import { store } from "./firebase.config";

export const createImageUploadProps = (
  onSuccess: (url: string) => void,
  onError: (error: any) => void
) => {
  const imageRef = ref(store, "/images");

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: RcFile;
    onSuccess: (url: string) => void;
    onError: (error: any) => void;
  }) => {
    try {
      const rcfile = file as RcFile;
      const imgRef = ref(imageRef, rcfile.name);

      await uploadBytes(imgRef, rcfile);
      const getUrl = await getDownloadURL(imgRef);

      onSuccess?.(getUrl);
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      console.log(info);

      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        const downloadUrl = info.file.response.url;
        onSuccess?.(downloadUrl);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        onError?.(info.file);
      }
    },
    customRequest,
  };
};
