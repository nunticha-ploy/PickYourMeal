import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItemList from "./MenuItemList";
import Header from '../components/Header';

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
            const response = await fetch(`http://localhost:3000/menuItems/search?keyword=${encodeURIComponent(keyword)}`, {
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
            <h2>Search Menu</h2>
            <form onSubmit={handleSearch}>
                <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="..." disabled={loading} required></input>
                <button type="submit" disabled={loading}>Search</button><br />
                {loading ? "Searching..." : ""}
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

export default SearchMenuItemPage;