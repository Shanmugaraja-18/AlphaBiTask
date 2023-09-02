
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="home">
      <Head>
        <title>GIFs World</title>
      </Head>
      <style global jsx>{`
        /* Global CSS styles */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
      `}</style>
      <style jsx>{`
        /* Component-specific CSS styles */
        .home {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Cover the entire screen */
          background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/background-image.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .content {
          text-align: center;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
        }

        h1 {
          font-size: 2.5rem;
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #777;
        }

        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
      <div className="content">
        <h1>Welcome to the GIFs World!</h1>
        <p>Discover a world of animated creativity.</p>
        <Link href="/secret">
          <button>Explore GIFs</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
