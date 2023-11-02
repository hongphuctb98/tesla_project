import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency, numberWithCommas } from "../../helper";
import { Button, Image } from "antd";
import { handleUploads } from "../../firebase/uploadImage";
import EditCarModal from "./EditCarModal";
import instance from "../../api/axios";
import EditVersionModal from "./EditVersionModal";
import CreateVersionModal from "./CreateVersionModal";

const CarDetail = () => {
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [downloadUrls, setDownloadUrls] = useState<any>([]);
  const [isSaveBtn, setIsSaveBtn] = useState<boolean>(false);
  const [CarDetail, setCarDetail] = useState<any>({});
  const [versions, setVersions] = useState<any>([]);

  const navigate = useNavigate();
  const params = useParams();

  const loadData = () => {
    instance
      .get(`products/${params.id}`)
      .then((res) => {
        setVersions(res.data.data.VersionList);
        setCarDetail(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateCar = (updatedCar: any) => {
    axios
      .put(`http://localhost:8080/api/v1/products/${params.id}`, updatedCar)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (downloadUrls.length > 0) {
      const updateCar = {
        BasePrice: CarDetail.BasePrice,
        BgImage: CarDetail.BgImage,
        CarName: CarDetail.CarName,
        Descriptions: CarDetail.Descriptions,
        MainImage: downloadUrls[0],
      };

      handleUpdateCar(updateCar);
    }
  }, [downloadUrls, CarDetail]);

  const handleBack = () => {
    navigate("/admin/product");
  };

  // Upload hình ảnh
  const handleMainImg = () => {
    handleUploads(imageUrls).then((response: any) => {
      setDownloadUrls(response);
    });
    setIsSaveBtn(false);
  };

  const handleChangeInput = (e: any) => {
    const files = Array.from(e.target.files);
    setIsSaveBtn(true);
    setImageUrls(files);
  };

  const [isEditCarModal, setIsEditCarModal] = useState(false);
  const [isEditVersionModal, setIsEditVersionModal] = useState(false);
  const [isCreateVersionModal, setIsCreateVersionModal] = useState(false);
  const [editVersion, setEditVersion] = useState("");

  const showModalEditCar = () => {
    setIsEditCarModal(true);
  };
  const showModalEditVersion = (id: any) => {
    setIsEditVersionModal(true);

    if (Object.keys(CarDetail).length > 0) {
      setEditVersion(
        CarDetail.VersionList.find((item: any) => item.VersionId === id)
      );
    }
  };
  const showModalCreateVersion = () => {
    setIsCreateVersionModal(true);
  };

  return (
    <>
      <div className="text-right">
        <button
          className="px-[12px] py-[6px] bg-blue-400 hover:bg-blue-500 text-right rounded-md text-white"
          onClick={handleBack}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-center mb-4">
        {CarDetail?.CarName} Detail
      </h1>
      <div className="w-1/2 mx-auto relative">
        <Image
          width="100%"
          src={downloadUrls.length > 0 ? downloadUrls[0] : CarDetail?.MainImage}
        />
        <div className="absolute top-0 right-[-80px] flex flex-col items-center ">
          <input
            onChange={handleChangeInput}
            multiple
            type="file"
            id="file-input"
            className="hidden"
          />
          <label
            id="file-input-label "
            className="border rounded-full border-gray-600 w-8 h-8 cursor-pointer flex items-center justify-center"
            htmlFor="file-input"
          >
            <i className="fa-solid fa-pencil"></i>
          </label>

          {isSaveBtn && (
            <Button
              onClick={handleMainImg}
              className="bg-blue-600 text-white  rounded-md mt-2"
              type="primary"
            >
              Save
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 items-center"></div>
      </div>

      <div className="text-3xl font-semibold mt-5">Car information</div>
      <div className="text-base flex flex-col gap-4  border p-4  border-gray-400 rounded-md mt-5">
        <div className="flex items-end">
          <p className="font-semibold min-w-[120px] text-lg">Car name : </p>
          {CarDetail?.CarName}
        </div>
        <div className="flex items-end">
          <p className="font-semibold min-w-[120px] text-lg">Price : </p>
          {formatCurrency(CarDetail?.BasePrice)}
        </div>

        <div className="flex items-end">
          <p className="font-semibold min-w-[120px] text-lg">Descriptions: </p>
          {CarDetail?.Descriptions
            ? `${CarDetail?.Descriptions}`
            : "Not Available"}
        </div>
        <div className="flex items-center">
          <p className=" text-lg font-semibold min-w-[180px]">
            Background Image :
          </p>
          <Image width={200} src={CarDetail?.BgImage} className="rounded-md" />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Button
            className="bg-yellow-500 text-white"
            onClick={showModalEditCar}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="text-3xl font-semibold mt-10">Car version</div>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={showModalCreateVersion}
        >
          <i className="fa-solid fa-plus mr-2"></i> Create version
        </Button>
      </div>
      {versions.map((version: any, i: number) => (
        <div className="text-base flex flex-col gap-4  border p-4  border-gray-400 rounded-md mt-5">
          <div className="flex flex-wrap">
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Version name :</p>
              {version.VersionName === CarDetail?.CarName
                ? `${version.VersionName} Rear-Wheel Drive
                `
                : `${version.VersionName} 
                `}
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Price : </p>
              {formatCurrency(version.Price)}
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Quantity : </p>
              {version?.Quantity}
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Range : </p>
              {version?.Range} mi
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Seating : </p>
              {version?.Seating}
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">TopSpeed : </p>
              {version?.TopSpeed} sec
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Acceleration : </p>
              {version?.Acceleration} mph
            </div>
            <div className="flex items-end w-1/4 mb-4">
              <p className="font-semibold  text-base mr-2">Wattage : </p>
              {numberWithCommas(version.Wattage)} hp
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button
              className="bg-yellow-500 text-white"
              onClick={() => showModalEditVersion(version.VersionId)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={() => showModalEditVersion(version.VersionId)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <EditCarModal
        loadData={loadData}
        isEditCarModal={isEditCarModal}
        setIsEditCarModal={setIsEditCarModal}
        carId={Number(params.id)}
      />

      <EditVersionModal
        loadData={loadData}
        isEditVersionModal={isEditVersionModal}
        setIsEditVersionModal={setIsEditVersionModal}
        editVersion={editVersion}
      />

      <CreateVersionModal
        loadData={loadData}
        isCreateVersionModal={isCreateVersionModal}
        setIsCreateVersionModal={setIsCreateVersionModal}
        carId={Number(params.id)}
      />
    </>
  );
};

export default CarDetail;
