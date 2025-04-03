import "./LogIn.css";
import Input from "../../components/Input/Input";
import LogoRozetkaSvg from "../../assets/rozetkaLogo.svg";
import ButtonLogIn from "../../components/ButtonLogIn/ButtonLogIn";
import Card from "../components/Card/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const LogIn = () => {
    const navigate = useNavigate(); 

    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault(); 
        setError(""); 
        setUsernameError("");
        setPasswordError("");

        let hasError = false;
        if (!username) {
            setUsernameError("Username is required.");
            hasError = true;
        }
        if (!password) {
            setPasswordError("Password is required.");
            hasError = true;
        }
        if (hasError) return;

        try {
            const response = await fetch("http://localhost:3001/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Invalid username or password.");
            } else {
                console.log("Login successful!");
                navigate("/product-table"); 
            }
        } catch (err) {
            setError("Network error. Try again later.");
        }
    };

    return (
        <div className="container">
            <Card className="logInCard">
                <div>
                    <img src={LogoRozetkaSvg} alt="LogoRozetka"/>
                </div>
                <form className="InnerInputs" onSubmit={handleLogin}>
                    <div className="input-container">
                        <Input
                            type="text"
                            placeholder="Username"
                            className="userName"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError("");
                            }}
                        />
                        {usernameError && <p className="error-message">{usernameError}</p>}
                    </div>
                    <div className="input-container">
                        <div className="innerPassword">
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Password"
                                className="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                            <button
                                type="button"
                                className="buttonEye"
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <ButtonLogIn className="buttonLogIn" type="submit" />
                </form>
            </Card>
        </div>
    );
};

export default LogIn;
