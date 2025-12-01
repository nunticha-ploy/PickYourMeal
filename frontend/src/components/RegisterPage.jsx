import { useState } from "react";
import { useNavigate } from "react-router-dom";

function registerPage() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleSubmut = async (e) => {
        e.preventDefault();
        setSubmit(true);

        //will add error handler for all possible types of error responses later
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName,
                    userEmail,
                    userPassword
                })
            });

            if (response.ok || response.status === 200) {
                alert("Successfully create an account");
                navigate("/");
            }
        } catch (err) {
            alert("Network error");
            console.log(err);
            setSubmit(false);
        }
    };

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={handleSubmut}>
                <label>User Name: <input type="text" value={userName} onChange={handleNameChange} disabled={submit} /></label><br />
                <label>Email: <input type="text" value={userEmail} onChange={handleEmailChange} disabled={submit} /></label><br/>
                <labe>Password: <input type="text" value={userPassword} onChange={handlePasswordChange} disabled={submit} /></labe><br/>
                <p>Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and number</p><br/>
                <button type="submit" disabled={submit}>register</button>
            </form>

        </>
    )

}

export default registerPage;