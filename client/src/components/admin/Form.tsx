import { CloudUploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import UploadCom from "./UploadCom";
import UploadMultiple from "./UploadMultiple";

const Form = () => {
  return (
    <div className="w-1/5 mx-auto mt-24">
      {/* <form action="" className="flex flex-col gap-4 items-center">
        <h3>Upload file</h3>
        <label htmlFor="file" className="text-4xl cursor-pointer">
          <CloudUploadOutlined />
        </label>
        <input type="file" id="file" hidden />
        <Button>Upload</Button>
      </form> */}

      {/* <UploadCom /> */}
      <UploadMultiple />
    </div>
  );
};

export default Form;
