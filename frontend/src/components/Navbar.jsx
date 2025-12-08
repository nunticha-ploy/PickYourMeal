import LogOutButton from './LogOutButton';

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav>
            {user && (
                <>
                    <span>{user.name}</span>
                    <LogOutButton />
                </>
            )}
        </nav>
    );
}

export default Navbar;