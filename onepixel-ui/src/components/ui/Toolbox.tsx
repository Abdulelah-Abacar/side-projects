import React from "react";
import FacebookIcon from "../../assets/facebook-icon.svg";
import XIcon from "../../assets/x-icon.svg";
import LinkedInIcon from "../../assets/linkedin-icon.svg";
import InstagramIcon from "../../assets/instagram-icon.svg";

// Define social media links
const socialMediaLinks = [
  {
    id: "facebook",
    icon: FacebookIcon,
    url: "https://www.facebook.com",
  },
  {
    id: "x",
    icon: XIcon,
    url: "https://twitter.com",
  },
  {
    id: "linkedin",
    icon: LinkedInIcon,
    url: "https://www.linkedin.com",
  },
  {
    id: "instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com",
  },
];

const Toolbox = () => {
  return (
    <div className="relative w-72 p-4 bg-black border border-gray-600 rounded-lg shadow-2xl">
      {/* Arrow at the top-right corner */}
      <div className="absolute -top-3 right-4">
        <div className="w-5 h-5 bg-black border-t border-l border-gray-600 transform rotate-45 clip-path-triangle"></div>
      </div>

      {/* Icons with dividers */}
      <div className="flex items-center justify-between">
        {socialMediaLinks.map((social, index) => (
          <React.Fragment key={social.id}>
            <div className="flex items-center">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.id} page`}
              >
                <img
                  src={social.icon}
                  alt={`${social.id} icon`}
                  className="w-6 h-6 lg:w-8 lg:h-8 social-icon"
                />
              </a>
              {/* Add divider except for the last icon */}
              {index < socialMediaLinks.length - 1 && (
                <div
                  className={`hidden lg:block h-8 min-h-[1em] w-0 border-[0.5px] border-solid [border-image:linear-gradient(180deg,_#494747_6.68%,_#8BD612_31.45%,_#7ABC10_72.01%,_#494747_92.08%)_0.5] mx-5`}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;

// Add this CSS to your global styles or a CSS module
<style>
  {`
    .clip-path-triangle {
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
  `}
</style>;
