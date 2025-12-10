import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItemList from "./MenuItemList";
import Header from '../components/Header';
import '../components/page.css';

function RandomMenuPage() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleRandom = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${import.meta.env.API_URL}/menuItems/random`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok || response.status === 200) {
                setResult(data);
                setError("");
            } else {
                setError(data.message);
                setResult([]);
            }
        } catch (err) {
            alert("Network error");
            console.log(err);
            setResult([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main>
                <section className="containerSearch">
                    <h1>Random Menu</h1>
                    <form onSubmit={handleRandom} className="searchPlaceholder">
                        <button type="submit" disabled={loading}>Random</button><br />
                        {loading ? "Randoming..." : ""}
                    </form>
                    <div>
                        {error && (
                            <div>
                                {error}
                            </div>
                        )}
                    </div>
                    <div>
                        <MenuItemList menuItems={result} />
                    </div>
                </section>
            </main>

        </>

    )

}

export default RandomMenuPage;