import { privateAxios } from "./helper";

export const createComment = (comment, postId) => {
  return privateAxios.post(`/posts/${postId}/comments`, comment);
};
