import axios from "axios";

const normalizeUrl = (url: string) => {
  if (url.startsWith("https://i.ibb.co/") && !url.includes(".com")) {
    return url.replace("https://i.ibb.co/", "https://i.ibb.co.com/");
  }
  return url;
};

const uploadToImgbb = async (image: File) => {
  const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let imageUrl = response.data.data.url;
    imageUrl = normalizeUrl(imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadToImgbb;
