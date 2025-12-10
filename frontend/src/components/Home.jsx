import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './page.css';

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main>
                <section className="containerHome" >
                </section>
            </main>
        </>
    );
}

export default Home;