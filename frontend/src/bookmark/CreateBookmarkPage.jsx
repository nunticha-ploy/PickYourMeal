import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import '../components/page.css';


function CreateBookmarkPage() {
    const navigate = useNavigate();
    const [bookmarkName, setBookmarkName] = useState("");
    const [submit, setSubmit] = useState(false);

    const handleBookmarkNameChange = (e) => {
        setBookmarkName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/create/bookmark`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: bookmarkName,
                    menuItems: []
                })
            });

            if (response.ok || response.status === 200) {
                alert("Successfully create a bookmark");
                navigate("/mybookmark")
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
                <section className="containerSearch">
                    <h1>Create New Bookmark</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="searchPlaceholder">
                            <label>Bookmark Name:</label>
                            <input type="text" value={bookmarkName} onChange={handleBookmarkNameChange} disabled={submit} required />
                        </div>
                        <div>
                            <button type="submit" disabled={submit}>Submit </button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}
export default CreateBookmarkPage;