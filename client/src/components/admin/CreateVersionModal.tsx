import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import { handleAlert } from "../../utils/HandleAlert";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { store } from "../../firebase/firebase.config";
import { RcFile } from "antd/es/upload";

interface Props {
  isCreateVersionModal: boolean;
  setIsCreateVersionModal: (isModalOpen: boolean) => void;
  loadData: any;
  carId: number;
}
type FieldType = {
  VersionName?: string;
  Price?: number;
  Quantity?: number;
  Range?: number;
  Acceleration?: number;
  TopSpeed?: number;
  Wattage?: number;
  Seating?: number;
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const CreateVersionModal: React.FC<Props> = ({
  isCreateVersionModal,
  setIsCreateVersionModal,
  loadData,
  carId,
}) => {
  const [colors, setColors] = React.useState([]);
  const [selectedColorId, setSelectedColorId] = React.useState("");
  const [createdVersionId, setCreatedVersionId] = React.useState("");
  const handleCancel = () => {
    setIsCreateVersionModal(false);
  };
  const handleChange = (value: string) => {
    setSelectedColorId(value);
  };

  const createVersion = (newVersion: any) => {
    instance
      .post(`/versions`, newVersion)
      .then((res) => {
        setCreatedVersionId(res.data.data.insertId);
        loadData();
        handleAlert("Success", "Update version successfully", "success").then(
          () => {
            setIsCreateVersionModal(false);
          }
        );
      })
      .catch((err) => console.log(err));
  };
  const getAllColors = () => {
    instance
      .get(`/colors`)
      .then((res) => {
        setColors(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllColors();
  }, []);

  // upload image
  const imageRef = ref(store, "/images");
  const [url, setUrl] = useState<string>();

  const props: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // trả về đường dẫn
        const downloadUrl = info.file.response.url;
        setUrl(downloadUrl);
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
  const onFinish = async (values: any) => {
    const newVersion = {
      ...values,
      carId,
      colorId: selectedColorId,
      image: url,
    };
    // console.log(url);
    // console.log(selectedColorId);
    // console.log(carId);

    createVersion(newVersion);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isCreateVersionModal}
        width={700}
        style={{
          top: 40,
          margin: "auto",
        }}
        onCancel={handleCancel}
        footer={false}
        okButtonProps={{
          style: {
            backgroundColor: "#3b82f6",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#eab308",
          },
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="VersionName"
            name="VersionName"
            rules={[
              { required: true, message: "Please input your version name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-wrap gap-x-6">
            <Form.Item<FieldType>
              label="Price"
              name="Price"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your Price!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Price must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Quantity"
              name="Quantity"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Quantity!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Quantity must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Range (mi)"
              name="Range"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Range!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Range must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Acceleration (mhp)"
              name="Acceleration"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Acceleration!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Acceleration must be greater than 0"
                    );
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item<FieldType>
              label="TopSpeed (sec)"
              name="TopSpeed"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your TopSpeed!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("TopSpeed must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Wattage (hp)"
              name="Wattage"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Wattage!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Wattage must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Seating"
              name="Seating"
              labelCol={{ span: 24 }}
              style={{ width: "200px" }}
              rules={[
                { required: true, message: "Please input your Seating!" },
                {
                  validator: (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Seating must be greater than 0");
                  },
                },
              ]}
            >
              <InputNumber style={{ width: "200px" }} />
            </Form.Item>
          </div>

          <div className="mb-5">Add image</div>

          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Select
                      defaultValue="select color"
                      style={{ width: 250 }}
                      onChange={handleChange}
                      options={colors.map((item: any) => ({
                        value: item.ColorId,
                        label: item.ColorName,
                      }))}
                    />
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      <Image width={200} src={url} />
                    </Upload>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add version image
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateVersionModal;
