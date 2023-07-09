import { useContext } from "react";
import Base from "../components/Base";
import { UserContext } from "../context/userContext";

const About = () => {

    const user = useContext(UserContext);

    return (
        <Base>
            <h1>This is the about page</h1>
            <p>We are building a blog website</p>
            <h3>Welcome {user.name}</h3>
        </Base>
    )
};

export default About;