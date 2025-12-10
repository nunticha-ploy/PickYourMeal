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
                        <p>Stop staring at your fridge! Let Pick Your Meal choose a random recipe for you!</p>
                        <h4>Don't know what to cook?</h4>
                    </div>
                    <div className="readingImgContainer">
                        <img className="readingImg" src={cookingImg} alt="kids reading the book" width={500} height={500} />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;