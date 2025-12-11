import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';

function OTPVerifyPage() {
    const [otp, setOtp] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    let email = "";
    if (location.state.email) {
        email = location.state.email;
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/verify-login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            if (response.ok || response.status === 200) {

                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Successfully login");
                navigate("/");
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
            <Header />
            <main>
                <section className="searchPlaceholder">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className="searchPlaceholder">
                        <label>Email: <input type="email" value={email} readOnly /></label><br />
                        <label>OTP: <input type="text" value={otp} onChange={handleOtpChange} disabled={submit} /></label><br />
                        <button type="submit" disabled={submit}>Submit</button>
                    </form>
                </section>
            </main>
        </>
    )

}

export default OTPVerifyPage;