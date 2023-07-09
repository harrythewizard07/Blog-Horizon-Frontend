import { privateAxios, myAxios } from "./helper";

//create post function
export const createPost = (postData) => {
  //console.log(postData);

  return privateAxios
    .post(`/users/${postData.userId}/posts`, postData)
    .then((response) => response.data);
};

//get all posts
export const getAllPosts = () => {
  return myAxios.get(`/posts`).then((response) => response.data);
};

//get a single post by a given post id
export const getPostById = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

//get post by category
export const getPostByCategory = (categoryId) => {
  return privateAxios
    .get(`/posts/categories/${categoryId}`)
    .then((response) => response.data);
};

//get post by userId
export const getPostByUserId = (userId) => {
  return privateAxios
    .get(`/posts/users/${userId}`)
    .then((response) => response.data);
};

//update blog posts
export const updatePostService = (post, postId) => {
  return privateAxios
    .put(`/posts/${postId}`, post)
    .then((response) => response.data);
};

//delete posts
export const deletePostService = (postId) => {
  return privateAxios
    .delete(`/posts/${postId}`)
    .then((response) => response.data);
};
