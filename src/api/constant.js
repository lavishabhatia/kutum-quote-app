export const IP = "https://assignment.stage.crafto.app";

export const c = `${IP}`;

export const imageUploadURL = `https://crafto.app/crafto/v1.0/media/assignment/upload/`;


export const getStoreHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? token : null;
};
