// import React, { useState } from "react";
// import { Button, Card, CardBody, Input } from "reactstrap";
// import { createComment } from "../services/comment-service";

// const AddComment = () => {
//   const [comment, setComment] = useState({
//     name: "",
//     email: "",
//     body: "",
//   });

//   //field changed function
//   const fieldChanged = (event) => {
//     setComment({ ...comment, [event.target.name]: event.target.value });
//   };

//   const submitComment = () => {
//     createComment(comment,)
//   }

//   return (
//     <Card className="mt-2 mb-4 border-0 shadow">
//       <CardBody>
//         {/* {JSON.stringify(comment)} */}
//         <Input
//           className="my-2"
//           type="text"
//           placeholder="Enter your name"
//           name="name"
//           value={comment.name}
//           onChange={fieldChanged}
//         />
//         <Input
//           className="my-2"
//           type="email"
//           placeholder="Enter your email id"
//           name="email"
//           value={comment.email}
//           onChange={fieldChanged}
//         />
//         <Input
//           className="my-2"
//           type="textarea"
//           placeholder="Comment here"
//           name="body"
//           value={comment.body}
//           onChange={fieldChanged}
//         />
//         <Button className="mt-2" onClick={submitComment}>Submit</Button>
//       </CardBody>
//     </Card>
//   );
// };

// export default AddComment;
