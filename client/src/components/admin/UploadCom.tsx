import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { store } from "../../firebase/firebase.config";
import { RcFile } from "antd/es/upload";

const UploadCom: React.FC = () => {
  const imageRef = ref(store, "/images");
  const [url, setUrl] = useState<string>();

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log(info);

      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // trả về đường dẫn
        const downloadUrl = info.file.response.url;
        setUrl(downloadUrl);
        console.log("downloadUrl", downloadUrl);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const rcfile: any = file as RcFile;
        // tạo một tham chiếu đến store
        const imgRef: any = ref(imageRef, rcfile.name);

        // tải hình ảnh lên firebase
        await uploadBytes(imgRef, rcfile);

        // lấy url từ firebase về
        const getUrl = await getDownloadURL(imgRef);

        // truy vấn thành công
        onSuccess?.({ url: getUrl });
      } catch (error: any) {
        onError?.(error);
      }
    },
  };
  return (
    <Upload {...props}>
      <img src={url} alt="" className="w-1/2 mx-auto" />
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadCom;
