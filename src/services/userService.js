import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Cria um novo usuário
async function createUser(userData) {
  const { data } = await axios.post(`${API_URL}/user`, userData);
  return data;
}

// Busca usuário por ID
async function getUserById(id) {
  const { data } = await axios.get(`${API_URL}/user/${id}`);
  return data;
}

// Atualiza usuário por ID
async function updateUser(id, userData) {
  const { data } = await axios.put(`${API_URL}/user/${id}`, userData);
  return data;
}

// Deleta usuário por ID
async function deleteUser(id) {
  const { data } = await axios.delete(`${API_URL}/user/${id}`);
  return data;
}

// Faz upload e verifica documento do usuário
async function uploadDocument(id, documentData) {
  const formData = new FormData();
  formData.append("documentImage", documentData.documentImage);
  formData.append("documentType", documentData.documentType);
  formData.append("documentNumber", documentData.documentNumber);

  const { data } = await axios.post(
    `${API_URL}/user/${id}/document`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

// Conecta conta de rede social
async function connectSocialMedia(id, socialData) {
  const { data } = await axios.post(
    `${API_URL}/user/${id}/social-media`,
    socialData
  );
  return data;
}

// Valida perfil de e-sports
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
