import { myAxios } from "./helper";

//get all categories
export const getAllCategories = () => {
  return myAxios.get("/categories").then(response => { return response.data })
}

//get a single category by id
export const getCategoryById = (categoryId) => {
  return myAxios.get("/categories/" + categoryId).then((response) => response.data);
};