import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { UserContext } from "../context/userContext";
// import { getCurrentUserDetail } from "../auth/auth";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

  //const userContextData = useContext(UserContext)

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        //console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading categories !!");
      });
  }, []);

  return (
    <div> 
      <ListGroup className="mt-5">
        <ListGroupItem tag={Link} to="/blogs" action={true} className="border-0 mt-3 shadow-sm">
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((category, index) => {
            return (
              <ListGroupItem
                key={index}
                tag={Link}
                to={"/categories/" + category.id}
                action={true}
                className="border-0 mt-1 shadow-sm"
              >
                {category.name}
              </ListGroupItem>
            );
          })}
          {/* {userContextData.user.login === true ? getCurrentUserDetail() && getCurrentUserDetail().roles[0].name === "ROLE_ADMIN" ? <Button className="mt-2 rounded-0 shadow-sm" >Add Category</Button> : '' : ''} */}
      </ListGroup>
    </div>
  );
};

export default CategoryMenu;
