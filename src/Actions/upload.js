import { getDocumentAsync } from "expo-document-picker";
import { Platform } from "react-native";
import { uploadUrl } from "../config";

const upload = async (file) => {
  const formData = new FormData();
  console.log("file", JSON.stringify(file));
  formData.append("file", file);
  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const { file_id } = data;
    console.log("file_id", file_id);
    return file_id;
  } catch (err) {
    console.log("xxxxxxxx", err);
  }
};

export const docPicker = async () => {
  const res = await getDocumentAsync();
  if (res.type != "cancel") {
    if (Platform.OS != "web") {
      try {
        res.output = [
          {
            uri: res.assets[0].uri,
            type: res.assets[0].mimeType,
            name: "file",
          },
        ];
      } catch (err) {
        console.log(err);
      }
    }
    const fileId = await upload(res?.output?.[0]);
    const { output, ...rest } = res;
    return { ...rest, _id: fileId };
  }
};
