import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
    const [logout, setLogout] = useState(false);
    const [isLogIn, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLogin(!!user);

    }, []);

    const handleLogOut = async (e) => {
        setLogout(true);

        try {
            const response = await fetch(`${import.meta.env.API_URL}/users/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok || response.status === 200) {
                
                localStorage.removeItem("user");
                setIsLogin(false);

                alert("Logout successful");
                navigate("/login");
            } else {
                const contentType = response.headers.get("content-type");
                let errorMessage = "An error occurred";

                if (contentType && contentType.includes("application/json")) {
                    const error = await response.json();

                    if (error.errorMessage) {
                        errorMessage = error.errorMessage;
                    } else if (Array.isArray(error)) {
                        const messages = error.map(function (err) {
                            return err.message;
                        });
                        errorMessage = messages.join(", ");
                    } else {
                        if (error.message) {
                            errorMessage = error.message;
                        } else {
                            errorMessage = JSON.stringify(error);
                        }
                    }
                } else {
                    errorMessage = await response.text();
                }

                alert(errorMessage);
                setLogout(false);
            }
        } catch (err) {
            alert("Network error");
            console.log(err);
            setLogout(false);
        }
    };

    const handleLogIn = (e) => {
        navigate("./login");
    }

    return (
        <>
        {isLogIn ? (
            <button onClick={handleLogOut} disabled={logout}>Logout</button>
        ): (
            <button onClick={handleLogIn} >Login</button>
        )}
            
        </>
    )

}

export default LogOutButton;