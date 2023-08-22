import config from "config";

const mapper = (listing) => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  });
  //console.log(listing.images);
  const imgArray = [{ fileName: listing.images }];
  return {
    ...listing,
    images: imgArray.map(mapImage),
  };
};

export default { mapper };
