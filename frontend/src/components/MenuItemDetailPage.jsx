import Button from "./Button";
import { useLocation } from "react-router-dom";
import { useBookmarkContext } from "./BookmarkContext";

const MenuItemDetailPage = () => {
    const location = useLocation();
    const { addMenuItem } = useBookmarkContext();
    const menuItem = location.state.menuItem;

    return (
        <div>
            <h2>{menuItem.title}</h2>

            {menuItem.image_filename && (
                <img
                    src={menuItem.image_filename}
                    alt={menuItem.title}
                />
            )}

            {menuItem.description && (
                <p>{menuItem.description}</p>
            )}

            <div>
                {menuItem.cooking_time && (
                    <p><strong>Cooking Time:</strong> {menuItem.cooking_time} minutes</p>
                )}
                {menuItem.servings && (
                    <p><strong>Servings:</strong> {menuItem.servings}</p>
                )}
            </div>

            {menuItem.ratings && (
                <div>
                    <p>
                        <strong>Rating:</strong> {menuItem.ratings.rating}/5
                        ({menuItem.ratings.count} reviews)
                    </p>
                </div>
            )}

            {menuItem.ingredients && menuItem.ingredients.length > 0 && (
                <div>
                    <h3>Ingredients:</h3>
                    <ul>
                        {menuItem.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}

            {menuItem.instructions && (
                <div>
                    <h3>Instructions:</h3>
                    <div>
                        {typeof menuItem.instructions === "object" ? (
                            <ol>
                                {Object.entries(menuItem.instructions).map(([key, value]) => (
                                    <li key={key}>{value}</li>
                                ))}
                            </ol>
                        ) : (
                            <p>{menuItem.instructions}</p>
                        )}
                    </div>
                </div>
            )}

            <Button text="Add to Bookmark" onClick={() => addMenuItem(menuItem)} />
        </div>
    );
};

export default MenuItemDetailPage;