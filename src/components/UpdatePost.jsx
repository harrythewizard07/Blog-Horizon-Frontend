import React, { useEffect, useRef, useState } from "react";
import Base from "./Base";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePostService } from "../services/post-service";
import { toast } from "react-toastify";
import { Form, Button, Card, CardBody, Container, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react"
import { getAllCategories } from "../services/category-service";

const UpdatePost = () => {
  const { postId } = useParams();

  const editor = useRef(null)

  const [categories, setCategories] = useState([])

  const navigate = useNavigate();

  const [post, setPost] = useState(undefined);

  useEffect(() => { 

    //load the blog from the database
    getPostById(postId)
      .then((data) => {
        setPost({...data});
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading blog post !!");
      });

    //loading all the categories
    getAllCategories()
      .then((data) => {
        //console.log(data);
        setCategories(data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [postId]);

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name] : event.target.value })
  }

  const UpdatePost = (event) => {
    event.preventDefault()
    //console.log(post);

    updatePostService({ ...post }, post.id)
      .then(response => {
        //console.log(response)
        toast.success("Post updated successfully !!")
      })
      .catch(error => {
        console.log(error);
        toast.error("Error in updating post !!")
      })
    
    navigate("/user/dashboard")
  }

  const updateHtml = () => {
    return (
      <div className="wrapper">
      <Card className="shadow-sm border-0 mt-4">
        {/* {JSON.stringify(post)} */}
        <CardBody>
          <h3>Update Blog Post from here !!</h3>
          <Form onSubmit={UpdatePost}>
            <div className="my-3">
              <Label for="title">Blog Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                value={post.title}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <Label for="description">Blog Description</Label>
              <Input
                type="text"
                id="description"
                placeholder="Enter here"
                className="rounded-0"
                name="description"
                value={post.description}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <Label for="content">Blog Content</Label> 
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={newContent => setPost({ ...post, content: newContent })}
              />
            </div>
            <div className="my-3">
              <Label for="category">Blog Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                value={post.categoryId}
                onChange={handleChange}
                defaultValue={0}
              >
                <option value={0} disabled>--Select Category--</option>
                {
                  categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Update Blog
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
    )
  }
  
  return (
    <Base>
      <Container>
        {post && updateHtml()}
      </Container>
    </Base>
  );
};

export default UpdatePost;
