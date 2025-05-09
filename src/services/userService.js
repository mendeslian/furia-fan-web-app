import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

async function createUser(userData) {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    console.log("Create user API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function getUserById(id) {
  const { data } = await axios.get(`${API_URL}/user/${id}`);
  return data;
}

async function updateUser(id, userData) {
  const { data } = await axios.put(`${API_URL}/user/${id}`, userData);
  return data;
}

async function deleteUser(id) {
  const { data } = await axios.delete(`${API_URL}/user/${id}`);
  return data;
}

async function uploadDocument(userId, documentData) {
  try {
    const formData = new FormData();
    formData.append("documentType", documentData.documentType);
    formData.append("documentNumber", documentData.documentNumber);

    if (documentData.documentImage) {
      formData.append("documentImage", documentData.documentImage);
    }

    const response = await axios.post(
      `${API_URL}/user/${userId}/document`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}

async function connectSocialMedia(id, socialData) {
  const { data } = await axios.post(
    `${API_URL}/user/${id}/social-media`,
    socialData
  );
  return data;
}

async function validateEsportsProfile(id, profileData) {
  const { data } = await axios.post(
    `${API_URL}/user/${id}/esports-profile`,
    profileData
  );
  return data;
}

export {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  uploadDocument,
  connectSocialMedia,
  validateEsportsProfile,
};
