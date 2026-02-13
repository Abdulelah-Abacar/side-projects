import { FC, useState } from "react";
import Logo from "../../assets/OnePixelLogo";
import { Button } from "../ui/Button";
import FacebookIcon from "../../assets/facebook-icon.svg";
import XIcon from "../../assets/x-icon.svg";
import LinkedInIcon from "../../assets/linkedin-icon.svg";
import InstagramIcon from "../../assets/instagram-icon.svg";
import { FooterProps, SocialLink } from "../../types";

const apiUrl = import.meta.env.VITE_API_URL;

// Constants
const NAVIGATION_LINKS = [
  "About us",
  "Our Services",
  "Case Studies",
  "Pricing",
  "Testimonials",
  "Contact us",
  "FAQs",
] as const;

const SOCIAL_LINKS: SocialLink[] = [
  { icon: FacebookIcon, alt: "Facebook", url: "#" },
  { icon: XIcon, alt: "Twitter", url: "#" },
  { icon: InstagramIcon, alt: "Instagram", url: "#" },
  { icon: LinkedInIcon, alt: "LinkedIn", url: "#" },
];

// Helper functions
const formatLinkHref = (link: string): string =>
  `/#${link.toLowerCase().replace(/ /g, "-")}`;

// Components
const SocialIcon: FC<SocialLink> = ({ icon, alt, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${alt} page`}
  >
    <img
      src={icon}
      alt={alt}
      className="social-icon w-6 h-6 lg:w-8 lg:h-8 hover:opacity-80 transition-opacity"
    />
  </a>
);

const NavigationLink: FC<{ href: string; children: string }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="text-sm md:text-base lg:text-lg hover:text-Accent transition-colors"
  >
    {children}
  </a>
);

const NewsletterForm: FC<{ onSubscribe?: (email: string) => void }> = ({
  onSubscribe,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      try {
        // Send email to backend
        const response = await fetch(`${apiUrl}/api/subscribe/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Thank you for subscribing!");
          if (onSubscribe) {
            onSubscribe(email);
          }
        } else {
          alert(result.error || "Failed to subscribe. Please try again.");
        }
      } catch (error) {
        console.error("Error subscribing:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full md:w-80 lg:w-[400px]"
    >
      <input
        type="email"
        name="email"
        className="w-full border border-secondary bg-transparent outline-none p-4 py-3 md:py-2 pr-36 
                 placeholder:font-thin placeholder:text-sm text-sm lg:text-lg rounded-full text-secondary 
                 focus:border-Accent transition-colors duration-300"
        placeholder="Your Email Address"
        required
        aria-label="Email address for newsletter"
        disabled={isSubmitting}
      />
      <Button
        text={isSubmitting ? "Subscribing..." : "Subscribe"}
        className="absolute top-1/2 right-0.5 transform -translate-y-1/2"
        disabled={isSubmitting}
        type="submit"
      />
    </form>
  );
};

const Footer: FC<FooterProps> = ({ onSubscribe, className = "" }) => {
  const midPoint = Math.ceil(NAVIGATION_LINKS.length / 2);

  return (
    <footer
      className={`mt-10 bg-[url(./assets/MainBG.png)] bg-cover bg-no-repeat w-full 
                  px-2 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 text-secondary ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-6 lg:gap-12">
        {/* Left Section */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 md:gap-8">
          <Logo className="w-36 md:w-44 lg:w-52" />
          <p className="text-sm lg:text-base">
            Please enter your email to get our newsletters
          </p>
          <NewsletterForm onSubscribe={onSubscribe} />
          <div className="flex gap-10 mt-6">
            {SOCIAL_LINKS.map((socialLink) => (
              <SocialIcon key={socialLink.alt} {...socialLink} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <nav className="flex flex-wrap md:flex-nowrap justify-between items-start gap-12 md:gap-20">
          {/* First Column */}
          <div className="flex flex-col gap-8">
            {NAVIGATION_LINKS.slice(0, midPoint).map((link) => (
              <NavigationLink key={link} href={formatLinkHref(link)}>
                {link}
              </NavigationLink>
            ))}
          </div>
          {/* Second Column */}
          <div className="flex flex-col gap-8">
            {NAVIGATION_LINKS.slice(midPoint).map((link) => (
              <NavigationLink key={link} href={formatLinkHref(link)}>
                {link}
              </NavigationLink>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
