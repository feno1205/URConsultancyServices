import API from "./api";

const multipartConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

/*
|--------------------------------------------------------------------------
| Project APIs
|--------------------------------------------------------------------------
*/

export const createProject = async (data) => {
  return API.post(
    "/projects/create",
    data,
    multipartConfig
  );
};

export const getProjects = async () => {
  return API.get("/projects/all");
};

export const getProject = async (id) => {
  return API.get(`/projects/${id}`);
};

export const updateProject = async (
  id,
  data
) => {
  return API.put(
    `/projects/${id}`,
    data,
    multipartConfig
  );
};

export const deleteProject = async (
  id
) => {
  return API.delete(`/projects/${id}`);
};