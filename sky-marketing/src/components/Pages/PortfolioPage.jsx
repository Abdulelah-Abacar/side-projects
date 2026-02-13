import React from "react";
import Spacing from "../Spacing";
import SectionHeadingStyle3 from "../SectionHeading/SectionHeadingStyle3";

const ProfilePage = () => {
  // Image URLs provided by user
  const postImages = [
    "https://scontent.fjed2-1.fna.fbcdn.net/v/t39.30808-6/494034519_1280094020784861_7456899805973963332_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IPPnWspc6zsQ7kNvwGs7xBT&_nc_oc=AdmyDyPwo9xaiZyNExv99jX_REe2IDPeB7GlWEQK0g3H9xOMC7Wrf8qgArbLyc0ByqQ&_nc_zt=23&_nc_ht=scontent.fjed2-1.fna&_nc_gid=0o6xgXwtVGvr8_h6DZRdCQ&oh=00_AfRigKmfWnzbQMF2-y_lez2lRoJSWTIBvQedkS6rlNeXAQ&oe=6878191D",
    "https://runagency-adv.com/wp-content/uploads/2025/04/02-1229x1536.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/02-1-1229x1536.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/0f9810a5a7f22378713cee72c3848a86-1229x1536.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/be26fabcdf470bf0b0a34c51548b3a70-1536x673.webp",
  ];

  const reelImages = [
    "https://runagency-adv.com/wp-content/uploads/2025/04/ce66df43e101557bea980710964cd8ca.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/5e84db66e6a5c5fb1b5d1d9049e46687.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/9ea0a6521af17cfb7cb387167d11f49f.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/6a789e221184e065dcb6d14cc626ecd4.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/a5c5ca5780d6c82013f3a63887807bf3.webp",
    "https://runagency-adv.com/wp-content/uploads/2025/04/8cd50c088433ffd62764b8c5ccbd3784.webp",
  ];

  const logoImages = [
    "https://runagency-adv.com/wp-content/uploads/2025/04/Q-WEST.png",
    "https://runagency-adv.com/wp-content/uploads/2025/03/abo-adel.png",
    "https://runagency-adv.com/wp-content/uploads/2025/03/Group-1000004279.png",
    "https://runagency-adv.com/wp-content/uploads/2025/03/Layer_1-1.png",
  ];

  return (
    <div className="portfolio-container">
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Our Digital & Agricultural Marketing Portfolio"
        subTitle="Case Studies"
        shape="shape_3"
      />
      <Spacing lg="75" md="60" />
      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">Social Media Designs</h1>
        </div>

        {/* First Row - Quest Brand */}
        <div className="content-row post-row">
          <div className="side-text left-side">More</div>

          <div className="posts-container">
            {/* Post 1 */}
            <div className="post-card">
              <div className="post-image">
                <img src={postImages[0]} alt="Social media post" />
              </div>
            </div>

            {/* Post 2 */}
            <div className="post-card">
              <div className="post-image">
                <img src={postImages[1]} alt="Social media post" />
              </div>
            </div>

            {/* Post 3 */}
            <div className="post-card">
              <div className="post-image">
                <img src={postImages[2]} alt="Social media post" />
              </div>
            </div>
          </div>

          {/* Quest Logo */}
          <div className="brand-logo">
            <div className="logo-image">
              <img src={logoImages[0]} alt="Quest Logo" />
            </div>
          </div>
        </div>

        {/* Second Row - Abu Adol Brand */}
        <div className="content-row post-row reverse">
          <div className="side-text right-side">More</div>

          <div className="posts-container">
            {/* Post 4 */}
            <div className="post-card">
              <div className="post-image">
                <img src={postImages[3]} alt="Social media post" />
              </div>
            </div>

            {/* Post 5 - Wide */}
            <div className="post-card wide-card">
              <div className="post-image">
                <img src={postImages[4]} alt="Social media post" />
              </div>
            </div>
          </div>

          {/* Abu Adol Logo */}
          <div className="brand-logo">
            <div className="logo-image">
              <img src={logoImages[1]} alt="Abu Adol Logo" />
            </div>
          </div>
        </div>

        {/* Reels Section Header */}
        <div className="section-header">
          <h2 className="section-title">Reels</h2>
        </div>

        {/* Reels Row */}
        <div className="content-row reel-row">
          <div className="side-text left-side">More</div>

          <div className="reels-container">
            {/* Reel 1 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[0]} alt="Social media reel" />
              </div>
            </div>

            {/* Reel 2 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[1]} alt="Social media reel" />
              </div>
            </div>

            {/* Reel 3 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[2]} alt="Social media reel" />
              </div>
            </div>
          </div>

          <div className="brand-logo">
            <div className="logo-image">
              <img src={logoImages[2]} alt="Jomi Logo" />
            </div>
          </div>
        </div>

        {/* Bottom Row - SurgiCare */}
        <div className="content-row reel-row reverse">
          <div className="side-text right-side">More</div>

          <div className="reels-container">
            {/* Medical Reel 1 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[3]} alt="Medical reel" />
              </div>
            </div>

            {/* Medical Reel 2 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[4]} alt="Medical reel" />
              </div>
            </div>

            {/* Medical Reel 3 */}
            <div className="reel-card">
              <div className="reel-image">
                <img src={reelImages[5]} alt="Medical reel" />
              </div>
            </div>
          </div>

          {/* SurgiCare Logo */}
          <div className="brand-logo">
            <div className="logo-image">
              <img src={logoImages[3]} alt="SurgiCare Logo" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          /* Dark theme (default) */
          --bg-color: #000000;
          --text-color: #ffffff;
          --text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          --card-bg: #ffffff4e;
          --card-border: #cccccc7f;
          --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        @media (prefers-color-scheme: light) {
          :root {
            --bg-color: #ffffff;
            --text-color: #1a1a1a;
            --text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3);
            --card-bg: #0000004e;
            --card-border: #3333337f;
            --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          }
        }

        .portfolio-container {
          position: relative;
          overflow: hidden;
          background-color: var(--bg-color);
          transition: background-color 0.3s ease;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          padding: 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .main-title {
          font-size: 3.75rem;
          font-weight: bold;
          color: var(--text-color);
          margin: 0;
          text-shadow: var(--text-shadow);
          transition: color 0.3s ease;
        }

        .content-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5rem;
          max-height: min-content;
        }

        .content-row.reverse {
          flex-direction: row-reverse;
        }

        /* Define specific heights for different row types */
        .post-row {
          --card-height: 306px; /* 290px image + 16px padding */
        }

        .reel-row {
          --card-height: 436px; /* 420px image + 16px padding */
        }

        .side-text {
          color: var(--text-color);
          font-weight: bold;
          font-size: 1.5rem;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          background-color: var(--card-bg);
          padding: 0.8rem;
          border: 1px solid var(--card-border);
          border-radius: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--card-height);
          transition: all 0.3s ease;
        }

        .left-side {
          transform: rotate(180deg);
        }

        .posts-container {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .reels-container {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .post-card {
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease,
            border-color 0.3s ease, box-shadow 0.3s ease;
          background-color: var(--card-bg);
          padding: 0.8rem;
          border: 1px solid var(--card-border);
          border-radius: 0.3rem;
          overflow: hidden;
          position: relative;
          box-shadow: var(--card-shadow);
        }

        .post-card:hover {
          transform: scale(1.05);
        }

        .post-image {
          width: 230px;
          height: 290px;
          border-radius: 0.3rem;
          overflow: hidden;
          position: relative;
        }

        .wide-card .post-image {
          width: 530px;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-image {
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: bold;
          color: var(--text-color);
          margin: 0;
          text-shadow: var(--text-shadow);
          transition: color 0.3s ease;
        }

        .reel-card {
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease,
            border-color 0.3s ease, box-shadow 0.3s ease;
          background-color: var(--card-bg);
          padding: 0.8rem;
          border: 1px solid var(--card-border);
          border-radius: 0.3rem;
          box-shadow: var(--card-shadow);
        }

        .reel-card:hover {
          transform: scale(1.05);
        }

        .reel-image {
          width: 230px;
          height: 420px;
          border-radius: 0.3rem;
          overflow: hidden;
          position: relative;
        }

        .reel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Manual theme toggle classes (optional) */
        .light-theme {
          --bg-color: #ffffff;
          --text-color: #1a1a1a;
          --text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3);
          --card-bg: #0000004e;
          --card-border: #3333337f;
          --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .dark-theme {
          --bg-color: #000000;
          --text-color: #ffffff;
          --text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          --card-bg: #ffffff4e;
          --card-border: #cccccc7f;
          --card-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .content-row {
            flex-direction: column;
            gap: 2rem;
          }

          .content-row.reverse {
            flex-direction: column;
          }

          .side-text {
            writing-mode: horizontal-tb;
            text-orientation: initial;
            transform: none;
          }

          .posts-container,
          .reels-container {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .post-image {
            width: 200px;
            height: 200px;
          }

          .wide-card .post-image {
            width: 250px;
          }

          .reel-image {
            width: 150px;
            height: 250px;
          }

          .logo-image {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
