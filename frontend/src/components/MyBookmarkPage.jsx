import { useState, useEffect } from "react";
import MenuItemList from "./MenuItemList";

function MyBookmarkPage() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchBookmark = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost:3000/users/me", {
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

    }, []);



    return (
        <>
            <h2>My Bookmark</h2>
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
                    <p></p>
                )}
            </div>
        </>

    )

}

export default MyBookmarkPage;