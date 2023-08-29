import axios from "axios";

const {
  data: { CLOUD_KEY },
} = await axios.get("http://localhost:4000/api/getKey");

export const imageUpload = async (image) => {
  const formData = new FormData();

  if (image.camera) {
    formData.append("file", image.camera);
  } else {
    formData.append("file", image);
  }

  formData.append("upload_preset", "SocialApp");
  formData.append("cloud_name", CLOUD_KEY); //cloud name

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_KEY}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return { url: data.secure_url };
};
