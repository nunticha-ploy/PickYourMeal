import Navbar from './Navbar';

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header>
            <Navbar />
        </header>
    );
}

export default Home;