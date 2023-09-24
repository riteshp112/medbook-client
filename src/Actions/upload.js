import axios from "axios";
import { getDocumentAsync } from "expo-document-picker";
import { uploadUrl } from "../config";
import { Platform } from "react-native";

const upload = async (file) => {
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    const { file_id } = data;
    return file_id;
  } catch (err) {
    console.log("xxxxxxxx", err);
  }
};

export const docPicker = async () => {
  const res = await getDocumentAsync();

  if (res.type != "cancel") {
    if (Platform.OS != "web") {
      const file = await fetch(res.uri);
      console.log(file);
      const blob = await file.blob();
      // console.log(blob)
      const newFile = new File([blob], res.name);
      res.file = newFile;
    }
    const fileId = await upload(res.file);
    const { output, ...rest } = res;
    return { ...rest, _id: fileId };
  }
};
