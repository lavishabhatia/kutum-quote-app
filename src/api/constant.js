export const IP = "https://assignment.stage.crafto.app";

export const baseURL = `${IP}`;

export const imageUploadURL = `https://crafto.app/crafto/v1.0/media/assignment/upload/`;

// export const getStoreHeader = () => {
//   const token = localStorage.getItem("authToken");
//     console.log(token)
//     let header = {
//       headers: { Authorization: "Bearer " + token },
//     };
//     return header;
//   };
export const getStoreHeader = () => {
    const token = localStorage.getItem("authToken"); 
    return token ? token : null;
  };
  