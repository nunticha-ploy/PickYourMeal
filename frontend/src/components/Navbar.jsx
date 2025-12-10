import LogOutButton from '../user/LogOutButton';
import { useNavigate } from 'react-router-dom';
import './page.css';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav>
            <ul className="nav">
                <li onClick={() => navigate("/")} >Home</li>
                <li onClick={() => navigate("/search-menu")} >Search</li>
                <li onClick={() => navigate("/random-menu")} >Random</li>
                <li onClick={() => navigate("/mybookmark")} >my bookmark</li>
                <li><LogOutButton /></li>
            </ul>
        </nav>
    );
}

export default Navbar;