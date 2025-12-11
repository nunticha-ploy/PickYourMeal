import { useState, useEffect } from "react";
import MenuItemList from "../menu/MenuItemList";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../components/Header';
import '../components/page.css';

function MyBookmarkPage() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchBookmark = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();

                if (response.ok || response.status === 200) {
                    setBookmarks(data.bookmarks);
                    setError("");
                } else {
                    setError(data.message);
                    setBookmarks([]);
                }
            } catch (err) {
                alert("Network error");
                console.log(err);
                setBookmarks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmark();

    }, [location]);



    return (
        <>
            <Header />
            <main>
                <section className="containerSearch">
                    <h1>My Bookmark</h1>
                    <div>
                        {loading ? "Searching..." : ""}
                    </div>
                    <div>
                        {error && (
                            <div>
                                {error}
                            </div>
                        )}
                    </div>
                    <div>
                        {bookmarks.length > 0 ? (
                            bookmarks.map((bookmark) => (
                                <div key={bookmark._id}>
                                    <h3>{bookmark.name}</h3>
                                    <MenuItemList menuItems={bookmark.menuItems} />
                                </div>
                            ))
                        ) : (
                            <p>No bookmark</p>
                        )}
                        <div className="bookmark">
                            <button type="button" onClick={() => navigate("/create-bookmark")} >Create new bookmark</button>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )

}

export default MyBookmarkPage;