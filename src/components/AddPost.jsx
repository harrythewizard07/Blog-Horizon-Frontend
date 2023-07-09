import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react"
import { getAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import { createPost as doCreatePost } from "../services/post-service";
import { getCurrentUserDetail } from "../auth/auth";
//import { useNavigate } from "react-router-dom";

const AddPost = () => {

  const editor = useRef(null)

  const [categories, setCategories] = useState([])

  const [user, setUser] = useState(undefined)

  const [post, setPost] = useState({
    title: '',
    description: '',
    content:'',
    categoryId:''
  })

  //const navigate = useNavigate();

  useEffect(() => {

    setUser(getCurrentUserDetail())

    getAllCategories()
      .then((data) => {
        //console.log(data);
        setCategories(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //field changed function
  const fieldChanged = (event) => {
    setPost({...post, [event.target.name]:event.target.value})
  }

  //content field changed
  const contentFieldChanged = (data) => {
    setPost({...post, 'content':data})
  }

  //create post function
  const createPost = (event) => {
    event.preventDefault();

    //console.log(post);

    //validations if any
    if(post.title.trim() === "") {
      toast.error("Blog title cannot be empty!")
      return;
    }
    if(post.description.trim() === "") {
      toast.error("Blog description cannot be empty!")
      return;
    }
    if(post.content.trim() === "") {
      toast.error("Blog content cannot be empty!")
      return;
    }
    if(post.categoryId.trim() === "") {
      toast.error("Select some category!")
      return;
    }

    post['userId'] = user.id

    //submitting the form on server
    doCreatePost(post).then(data => {
      //toast.success("Post created successfully !!")
      //console.log(post);

      setPost({
        title: '',
        description: '',
        content: '',
        categoryId: ''
      })

    }).catch((error) => {
      toast.error("Error creating post !!")
      //console.log(error);
    })

    //navigate("/blogs")
    window.location.reload(); 
  }

  return (
    <div className="wrapper">
      <Card className="shadow-sm border-0 mt-4">
        {/* {JSON.stringify(post)} */}
        <CardBody>
          <h3>What's on your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Blog Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                value={post.title}
                onChange={fieldChanged}
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
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Blog Content</Label> 
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChanged}
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
                onChange={fieldChanged}
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
                Post Blog
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
