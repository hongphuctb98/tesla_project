export const transformData = (products: any) => {
  return products.reduce((result: any, product: any) => {
    const existingProduct = result.find((p: any) => p.CarId === product.CarId);

    if (existingProduct) {
      const existingVersion = existingProduct.VersionList.find(
        (v: any) => v.VersionId === product.VersionId
      );

      if (!existingVersion) {
        existingProduct.VersionList.push({
          VersionId: product.VersionId,
          VersionName: product.VersionName,
          Quantity: product.Quantity,
          Price: product.Price,
          TopSpeed: product.TopSpeed,
          Acceleration: product.Acceleration,
          Range: product.Range,
          Wattage: product.Wattage,
          Seating: product.Seating,
        });
      }
      const existingColor = existingProduct.ColorList.find(
        (c: any) => c.ColorId === product.ColorId
      );
      if (!existingColor) {
        existingProduct.ColorList.push({
          ColorId: product.ColorId,
          ColorName: product.ColorName,
          ColorImage: product.ColorImage,
        });
      }
      const existingImage = existingProduct.ImageList.find(
        (i: any) => i.ImageId === product.ImageId
      );

      if (!existingImage) {
        existingProduct.ImageList.push({
          CarDetailId: product.CardetailId,
          VersionName: product.VersionName,
          ColorName: product.ColorName,
          ImageId: product.ImageId,
          ImageUrl: product.ImageUrl,
        });
      }
    } else {
      const newProduct = {
        CarId: product.CarId,
        CarName: product.CarName,
        Descriptions: product.Descriptions,
        BasePrice: product.BasePrice,
        BgImage: product.BgImage,
        MainImage: product.MainImage,

        VersionList: [
          {
            VersionId: product.VersionId,
            VersionName: product.VersionName,
            Quantity: product.Quantity,
            Price: product.Price,
            TopSpeed: product.TopSpeed,
            Acceleration: product.Acceleration,
            Range: product.Range,
            Wattage: product.Wattage,
            Seating: product.Seating,
          },
        ],
        ColorList: [
          {
            ColorId: product.ColorId,
            ColorName: product.ColorName,
            ColorImage: product.ColorImage,
          },
        ],
        ImageList: [
          {
            CarDetailId: product.CardetailId,
            VersionName: product.VersionName,
            ColorName: product.ColorName,
            ImageId: product.ImageId,
            ImageUrl: product.ImageUrl,
          },
        ],
      };
      result.push(newProduct);
    }
    return result;
  }, []);
};
