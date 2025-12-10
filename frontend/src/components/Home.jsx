import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './page.css';
import cookingImg from '../assets/cooking.png';

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main>
                <section className="containerHome" >
                    <div>
                        <h1>Welcome to Pick Your Meal!<br /></h1>
                        <p>Stop staring at your fridge!<br /> Let Pick Your Meal choose a random recipe for you!</p>
                        <button className="button" onClick={() => navigate("/random-menu")} >Let's Cook!</button>
                    </div>
                    <div>
                        <img src={cookingImg} alt="kids reading the book" width={500} height={500} />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;