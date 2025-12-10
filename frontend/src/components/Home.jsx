import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <button onClick={() => navigate('/mybookmark')}>My Bookmark</button>
            </main>
        </>
    );
}

export default Home;