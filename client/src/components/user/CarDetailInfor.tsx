import React, { useState } from "react";

interface ICarProp {
  carInfor?: any;
}
const CarDetailInfor: React.FC<ICarProp> = ({ carInfor }) => {
  const [selectedVersion, setSelectedVersion] = useState<any>(0);

  const versions = carInfor?.VersionList;

  const handleVersionClick = (index: number) => {
    setSelectedVersion(index);
    console.log("index", index);
  };

  return (
    <>
      <div className="py-10  text-white bg-black">
        <div className="w-[70%] mx-auto">
          <div className="flex  ">
            <h2 className="text-4xl font-semibold flex-[2]">
              {carInfor?.CarName}
            </h2>
            <div className="flex flex-3 pt-4 justify-end">
              {versions?.length > 0 &&
                versions.map((version: any, index: any) => (
                  <p
                    key={index}
                    className={`px-10 pb-2 text-lg cursor-pointer ${
                      selectedVersion === index ? "border-b-4" : "border-b-2"
                    }`}
                    onClick={() => handleVersionClick(index)}
                  >
                    {version.VersionName}
                  </p>
                ))}
            </div>
          </div>

          <div className="py-14 border-b-2  border-dashed border-slate-600">
            <h3 className="text-2xl font-semibold mb-5">Drive</h3>
            <div className="grid grid-cols-5">
              <div>
                <p className="font-medium text-[15px]">Battery</p>
                <span className="text-base  ">Long Range</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Range (EPA est.)</p>
                <span className="text-base  ">
                  {versions?.length > 0 && versions[selectedVersion].Range} mi
                </span>
              </div>
              <div>
                <p className="font-medium text-[15px]">†Acceleration</p>
                <span className="text-base  ">
                  {versions?.length > 0 &&
                    versions[selectedVersion].Acceleration}{" "}
                  s 0-60 mph <br /> with rollout subtracted
                </span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Drive</p>
                <span className="text-base  ">
                  Dual Motor All-Wheel <br />
                  Drive
                </span>
              </div>
            </div>
          </div>
          <div className="py-14 border-b-2  border-dashed border-slate-600">
            <h3 className="text-2xl font-semibold mb-5">Dimensions</h3>
            <div className="grid grid-cols-5 gap-y-8 ">
              <div>
                <p className="font-medium text-[15px]">Weight</p>
                <span className="text-base  ">4,048 lbs</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Cargo</p>
                <span className="text-base  ">23 cu ftl</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Wheels</p>
                <span className="text-base  ">20"</span>
              </div>

              <div className="col-start-4 col-span-2 row-start-1 row-span-3">
                <img
                  src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Specs-Performance-Imperial.png"
                  alt=""
                />
              </div>
              <div>
                <p className="font-medium text-[15px]">Displays</p>
                <span className="text-base  ">15" Center Touchscreen</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Seating</p>
                <span className="text-base  ">5 Adults</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Ground Clearance</p>
                <span className="text-base  ">5.5"</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Overall Width</p>
                <span className="text-base  ">
                  Folded mirrors: 76.1" <br />
                  Extended mirrors: 82.2"
                </span>
              </div>

              <div>
                <p className="font-medium text-[15px]">Overall Height</p>
                <span className="text-base  ">56.8"</span>
              </div>

              <div>
                <p className="font-medium text-[15px]">Overall Length</p>
                <span className="text-base  ">184.8"</span>
              </div>
            </div>
          </div>
          <div className="py-14 border-b-2  border-dashed border-slate-600">
            <h3 className="text-2xl font-semibold mb-5">Charging</h3>
            <div className="grid grid-cols-5 ">
              <div>
                <p className="font-medium text-[15px]">Supercharging </p>
                <span className="text-base  ">
                  Max/Payment Type <br />
                  250 kW Max; Pay Per Use
                </span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Onboard Charger Max</p>
                <span className="text-base  ">11.5 kW max (48A)</span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Charging Speed</p>
                <span className="text-base  ">
                  Up to 147 miles added in <br /> 15 minutes
                </span>
              </div>
            </div>
          </div>
          <div className="py-14 ">
            <h3 className="text-2xl font-semibold mb-5">Warranty</h3>
            <div className="grid grid-cols-5 ">
              <div>
                <p className="font-medium text-[15px]">Basic Vehicle</p>
                <span className="text-base  ">
                  4 years or 50,000 mi,
                  <br />
                  whichever comes first
                </span>
              </div>
              <div>
                <p className="font-medium text-[15px]">Battery & Drive Unit</p>
                <span className="text-base  ">
                  8 years or 120,000 mi,
                  <br /> whichever comes first
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetailInfor;
