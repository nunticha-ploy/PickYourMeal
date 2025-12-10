import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItemList from "./MenuItemList";

function RandomMenuPage() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleRandom = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/menuItems/random", {
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
            <h2>Random Menu</h2>
            <form onSubmit={handleRandom}>
                <button type="submit" disabled={loading}>Random</button><br/>
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
        </>

    )

}

export default RandomMenuPage;