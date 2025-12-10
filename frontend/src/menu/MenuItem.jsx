import Button from "../components/Button";
import { useBookmarkContext } from "../bookmark/BookmarkContext";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ menuItem }) => {
    const navigate = useNavigate();
    const { addMenuItem } = useBookmarkContext();

    return (
        <div>
            <div>
                <h3>{menuItem.title}</h3>
                <p>{menuItem.description}</p>
                {menuItem.ingredients && (
                    <p>
                        <strong>Ingredients:</strong> {menuItem.ingredients.join(", ")}
                    </p>
                )}
            </div>
            <div>
                <Button text="Add to Bookmark" onClick={() => addMenuItem(menuItem)} />
                <button type="button" onClick={() => navigate("/menu-detail", {state: {menuItem}})} >More Detail</button>
            </div>
        </div>
    );
};

export default MenuItem;