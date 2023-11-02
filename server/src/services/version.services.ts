import db from "../utils/database";

export const addVersion = (version: any) => {
  return db.execute(
    `INSERT INTO version (
      VersionName, Price, Quantity, CarId, \`Range\`, Acceleration, TopSpeed, Wattage, Seating) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      version.VersionName,
      version.Price,
      version.Quantity,
      version.carId,
      version.Range,
      version.Acceleration,
      version.TopSpeed,
      version.Wattage,
      version.Seating,
    ]
  );
};

export const editVersion = (id: number, version: any) => {
  return db.execute("call Proc_version_UpdateVersion(?,?,?,?,?,?,?,?,?)", [
    version.VersionName,
    version.Price,
    version.Quantity,
    version.Range,
    version.Acceleration,
    version.TopSpeed,
    version.Wattage,
    version.Seating,
    id,
  ]);
};
