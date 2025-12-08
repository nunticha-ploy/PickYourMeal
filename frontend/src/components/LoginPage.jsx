import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok || response.status === 200) {
                alert("OTP has been sent to your email");
                navigate("/verify-otp", { state: { email } });
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email: <input type="email" value={email} onChange={handleEmailChange} disabled={submit} required/></label><br />
                <label>Password: <input type="password" value={password} onChange={handlePasswordChange} disabled={submit} required/></label><br />
                <button type="submit" disabled={submit}>Login</button>
                <p>Don't have an account? <button type="button" onClick={() => navigate("/register")} >Register</button></p>
            </form>
        </>
    )

}

export default LogInPage;