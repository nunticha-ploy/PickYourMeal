import Navbar from './Navbar';
import logo from '../assets/pick-your-meal.png';
import './page.css';



function Header() {

    return (
        <header className="containerHeader" >
            <div>
                <img className="logo" src={logo} alt="PickYourMeal logo" />
            </div>
            <nav>
                <Navbar />
            </nav>
        </header >
    );
}

export default Header;