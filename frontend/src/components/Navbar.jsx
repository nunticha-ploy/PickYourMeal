import LogOutButton from '../user/LogOutButton';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <nav>
            {user && (
                <>
                    <span>Hello, {user.name}</span>
                    <button type="button" onClick={() => navigate("/mybookmark")} >my bookmark</button>
                    <button type="button" onClick={() => navigate("/search-menu")} >Search</button>
                    <button type="button" onClick={() => navigate("/random-menu")} >Random</button>
                    <LogOutButton />
                </>
            )}
        </nav>
    );
}

export default Navbar;