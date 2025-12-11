import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItemList from "./MenuItemList";
import Header from '../components/Header';
import '../components/page.css';

function SearchMenuItemPage() {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState(false);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }


    const handleSearch = async (e) => {
        e.preventDefault();

        if (!keyword.trim()) {
            setError("Please provide a keyword");
            return;
        }

        setLoading(true);
        setError("");
        setSearch(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/menuItems/search?keyword=${encodeURIComponent(keyword)}`, {
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
                    <h1>Search Menu</h1>
                    <form onSubmit={handleSearch}>
                        <div className="searchPlaceholder">
                            <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="..." disabled={loading} required></input>
                            <button type="submit" disabled={loading}>Search</button><br />
                            {loading ? "Searching..." : ""}
                        </div>
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

export default SearchMenuItemPage;