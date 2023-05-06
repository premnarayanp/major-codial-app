import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Comment, Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }
 
      // console.log(response.data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxXjYfou58DzQmbhstbtO7hZEYTfroOmEqrLtp4zTC5g&s"
                alt="user-pic"
              />
              <div>
              <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="data:image/png;base64,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"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAZlBMVEUAAAD////+/v4EBAT39/d9fX3KysrCwsI8PDxJSUmSkpL7+/sTExNhYWExMTH09PTs7Oy4uLh1dXXk5OTX19ccHByxsbFYWFiIiIimpqbR0dGamppCQkI2NjYnJycsLCxra2tQUFB2SfUiAAAHs0lEQVRogcVb24KjIAwFsdqKVrzf2k77/z+5CejUqiNo1T0PszuOckgIkIRAaB+WxS34meZecPXJNvCvgZen2DZAkeC/8IO0v7Sg1HbibCPWPrLY4R1/9+ODm9Iwv6h3GduMFpqSjV3y8ENOyf2rcR6dN2OcwjlSWm/R5xbBpvIOgU0HYsQtFe6SXanbxl060DlSezuy9uHR1t7fOj8dRM3ICWT95cZ+HEWNQHLrLfdRClfwlOCK2yV72tgQDAyu5bYscSCxgkClo9w8OJw7kOMNP6LDqQmJkJtb4fnQ0UYwcg6pBXLn+65mk9yM5MjNL4eLjYLfbE6oczixggN2fuSK1kcM3KZeCmOtWfiXZ1nlTpqEYSiS2s2bODh375hzZ5Skpu9is+wWV6mw6RA8TNym+DEnRqQkN+/oq0rtzqPsnCz1L5d7g3DK+wLunHiGVn7PxdvJbKUFvP0t9Tz10L9leuUzYA6MuMv03XxY515c3Fo7eVyCUxUlnUKgM1FBiL5RBszX+dfwj48KHUwU0Uqj+Dr94stzResL0DTWS8OAWRsCZE3LbNflbbafWVAlnMphSJ96bl+rnFOivIzEu8lP5t/3AzQLeJ87Fx37fNcYudRK5jo2nrlXT6AZUrvyDYb9b3ggAMhcF4u+8kshP0te68l9R8qcSLs1bwTfhE4j/So3ECdoAbqzLbtc8z3xXQs77vrLN2h4/xSiN+mc1+otFmhz6X3F5yVH6mYVLZH9PddIniyzd9SSjFzs51pqhQrVLhb5JqhwtBTxXUQMzZQ42cRj0UcxfpM+vnSm4OsYJikV+hXsjcJGK1nS3T/ZYw5qr83t9ZFAZxPNJmPIDaMHclSGrzPw4jgNb18Tt2iocZjLVE+fW1GrTIMw9KdCEDvfymfH+QqLjEyo6N5kEClxKxk9XcrXxwUVqfePYNcEal58fg/7/MUcw1VBxj9U6w8zOTqg8UHf76ltDt4MG/VR60+92LCehefhU+8z8/mRBB39gfLReuiZCI5L8Gg24jq3BONFNEPBdZvKD/qaE9te6Zojeo3bbdRIziIGDX4fmI4tGkJ9KjSRnwtze8q5XjLNJt8F94vOpXUYeaCbZEyyBKVW6QVYeb0DMyN3raWfJqx8G24/oZb4I5xSb+ACZBBLrQHuKBMT4A3w7uhM575B9YcV/wJiL77B+dDUnADXjc66+mDmU7lVRl4nc0yfMxUaU/LDSW4IUcYplhk4U6qDjXQ2eZoBRTKlsUamFPjUZjIGH+8lgJuGm4XIPYEX10vbk3tqvF+6xeXP8b555pgO1TXjzUgKQcxW56ADaOycyfm9JEW2AM38/MZ1jdLnPtx4RDKbvoAQcH3YOwu5ns+qtMC0zg7MjPxo9zH0q/bYv5k0NY3TFP1pEV/GKTq/hUh/zSB8WQ7pr2mCaumnTkS/pWMOdyKEbTQrKulmWTXiXuafJ6ONzE8sTmc9B7l4Qgft6/CpRy3DjUQm8keCe/DQ4IACveSIfNgW+K/pErlH8Riz9Zam4lDLsosPrYO/nZ0XYNSqURyKlBG8mJAh+Td4cZnIMGgks+Vut13egSVy4ho1WKo0wWaIMN9yNVGezDNJv2ejE1r0t6yYMDPBM1TSNvk1Rk4w6ZbEOgXmkNOFx3zTiNHOakOh1Rcy9f3lmTyO2QkNd7zOzXzU2lvyXW6RqUoWOu8yDD9S+XNOuWYJ1qGSp1XLD6tKXMLp6n0bPrummIRP1piNVPsSIxkgDqXR/CxugalNZb0bcXdlqs3NlneeSVO3V6XvgSzzpNB8ZZkUri8r3WV2SqSxJME6c8EspOg+7EZ9fpXtaiLxPBTPE6slxyQ9+HjMEfcoz7lnNE2L3JYnsV8c6uFu7/Q+bmD8eFpqpuqzSiypbXn+vTTtLqGcF150v5FCVRxQaos8vkyukPfCcwXWXoDMVhr73afL4fQDdb/i8ki5rbLgSVp58eV8v/48Ho/r+VaUTZ4K3tVh2G6wlhbxRGe1G94gkbWNaYU5FxCrK/Ow7FAI0SUkVCUz+MfNfT2zcnI49dR4ZZE0HY5he1AlikY5zB0rb2kpr73vknNAWKnTGqQubTldfpen7FnVol/X23UA63q+4lX4sTu38lZLExNPNcVbTfo/walxHadOAbXjRE1cPNq/LTxQGv2OCzkG4QwXRlB3vlMGhozrW+T8usiJhYOaTBdIr5q8Hw0A83XwhKQqKIKJhbtB0z2eaWQl95UEgyeYQheyVht3352SyhIBGeS8MiQtI1nKE552LQovP+vXmHSxLGljNNrESf4LjESDur1b2B3uJc89mRHpoF4xaldtK8/2rlrNKOmllRgJqExVqzKinYF1mv1jQDWlcWLtXy7rUMLtd+2LrGqhzv3tJe0FeeD8UY+Mh3fiiFpZWY+MNeDhrRMyc8NopxT2gFvVYfeSbtCDBzliqImaUFjz/z/q7rn1n+8bqLDp4PJ3dbFH3vE47kKPQu9+Cf7ndJCNIXCb7t2rQfJjuNt6KUp7d7h2OqMZoxnco8L7e8fdH/uUWxncMffm3vXrv9xyA9v9viB/xzOf9wXhcZjf3p3cCF1TeE9ydFfxozSK73g/tL0b2oG0PpLVBXky5ow2vxf7jqE7FVP6D3I9UN13+VGDAAAAAElFTkSuQmCC"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
