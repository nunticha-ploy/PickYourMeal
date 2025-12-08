import { useState } from "react";
import { useNavigate } from "react-router-dom";

function registerPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmut = async (e) => {
        e.preventDefault();
        setSubmit(true);

        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (response.ok || response.status === 200) {
                alert("Successfully create an account");
                navigate("/");
            } else {
                const contentType = response.headers.get("content-type");
                let errorMessage = "An error occurred";

                if (contentType && contentType.includes("application/json")) {
                    const error = await response.json();

                    if (Array.isArray(error)) {
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
                setSubmit(false);
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
                <label>User Name: <input type="text" value={name} onChange={handleNameChange} disabled={submit} /></label><br />
                <label>Email: <input type="text" value={email} onChange={handleEmailChange} disabled={submit} /></label><br />
                <label>Password: <input type="text" value={password} onChange={handlePasswordChange} disabled={submit} /></label><br />
                <p>Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and number</p><br />
                <button type="submit" disabled={submit}>register</button>
            </form>

        </>
    )

}

export default registerPage;