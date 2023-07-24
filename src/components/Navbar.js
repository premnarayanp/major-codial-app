import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB7CAMAAACBxRQ0AAAAY1BMVEX///8AAADv7+/6+vrS0tLV1dXk5OTf39/Y2Ni4uLjc3Nz39/ekpKQzMzMZGRny8vJvb2+SkpIlJSXLy8sPDw+Dg4Oenp5OTk5WVlaurq4dHR1kZGRBQUHBwcGMjIwrKyt5eXkkGQErAAAFC0lEQVRogcVb2aKqMAxkc0FF2RRBAf//Ky8e9VxlkjZtwTPPLWPTZJom1fOECFftLkurfl/6ftkk5+OpXiylk10QFKeq8RFln8arcFbmNk0I4hf2VTYb//qoYn7iXB9moG7PeuYHuqn3P+6l1HfcpqQvribUP6sPJqJepqbUA/p6Eu56b8E94OJu+8Bm2Q+UsSN3kVtzDzg6Rf3OhXrA1cH0N0du328iS+rQfrvfUFhxbyfh9v3Whnwibqu1XwSfzZNEIgLG7Gpfq251EYRPrOLsoozIcm3GrYqx8265HY8PItV5mxsdsxH/nW7DzAli/tC9GHAfWCuelKdVxNKf5OScs+nlMuKML3Y6ZsMrzuAfONGTE+EBv6KN3oGX0YjozOMom02ri/x8DOhdE6l8QU5diLk9RiSukpmUy+xXJtyed7S0XUxMawy5Pa8jvpJrZ4XUwo1s/gBleW1O2drZC7Al9OaqkwliTmbBPfg8sQrN0b4mfq8VN2lDjcQTbmrsbC8QeqHUyACvZJ0ttxdgoqHcQTRV73DjRZlXuhxayuAsBBwwbBUaG8DoxOmqj8ejwu4o63Zh9kIA1ZuKHwybVDreNCF4Gv6D1XisSe5FAXNBVme2YCXXG/4WnIjdxxX8TufiBtidtSVEucI9hIBPJtxIiAxh3qXAEozJxW42Huha1xgAes25O+ibRRIxBhzRXAIPkebOjdbkAghMNAE5+NGOGVjOQF5Lycfj9OmmHpAMS8nZmPwGef9N8vGe7ycgF+85nCsTkIu9HY6gCcghReDiHNRogoYBqCYn2XD+WRUPPwGVAk6ywUQuqesDWxAuLkUAz3TNoojrV8kVVxbjkY2wDMMDjMnmJ0uwkW21/BdQnrmxQyHWXFMZvCfzKSnExdWxNwlepLAl1mPs+gQvhKAcPX9TXMGl9uxEjneGm2I0JFJuLoeXXtUtBDIup1DHhSuuap63geEuu45lUOVS0EOs60FkOVF9EcDYsBb4ED+lqXsfQOR837A98wJRjNIVl4ii6dXqrkrYUJsf4M1ucBOLZjBVOE+1s6iKrXktbkO9sdCXE6mlG9eFiGKiTDLIQr3Z8YZn8x2SjDAg+zupwb4XJLfMepSfDkeMOJWl50ulku4O9bI6xYFrATeithxRlXqaXpDStYqnRDLbUU2eH+w0O7/BM/kdsrWTHv9ju5Pi50e6hv9elB2E/GOo/BaRiV1Qq1f9mCwqMS1VzxGuxzb42P7DaneRPRvLRacU375//oD0uIvjto3j7HYh45qBqGVDNdgmwZ+yy55vzMUue7JEN7PdIfP5tdHLRzn2IrUJxE8+DSFTWrxGTAOZ0haCl7YW2MvK6QdW6JVIarX05MJbYCFQ7RHKLvAiNXsjbCWEseE7zPRHxuh06v8PFDfHa4OoS1/eRDwF+IC8Nd9KnucN1szewkjDXho0cZaZ7s1zc4k/D/u1Zt9Nag/bdVZx218maYzaoTmaZUr7tv72dIZUI7nVG7pypTkgZEr7icOmiHdZ1nXZqW4jpVjq0pJ5/4qx0bwQtVi7ARaaeJ+gcaliVy9dllXOxd7My/63XqdRG/uCmwgLtc/PS67W+Sk6p0qovM7tMZAECq+zfvcmB6s27i9D7Nkr5y6WPXvylb/5eaTP51/Y8Cewc/itdd8x8nnXV2+G+FDa/LvcH0qbfG+/f9lfa6++ve47nj7fzfFPTj02Vz95v114/wASiDzLhwMflgAAAABJRU5ErkJggg=="
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxXjYfou58DzQmbhstbtO7hZEYTfroOmEqrLtp4zTC5g&s"
                      alt="user-pic"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
