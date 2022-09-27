export default function rocketDataFormatter(dataArray) {
  const formattedData = dataArray.map((objRocketData) => {
    const formattedObj = {
      id: objRocketData.id,
      name: objRocketData.name,
      images: objRocketData.flickr_images,
      wikipedia: objRocketData.wikipedia,
      description: objRocketData.description,
      mass_kg: objRocketData.dry_mass_kg,
      height_m: objRocketData.height_w_trunk.meters,
      first_flight: objRocketData.first_flight,
    };
    return formattedObj;
  });
  return formattedData;
}
