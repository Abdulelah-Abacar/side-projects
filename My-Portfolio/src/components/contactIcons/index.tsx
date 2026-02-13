import {
  EmailIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../assets/icons/index";
const contactIcons = [
  {
    link: "mailto:abdulelahabacar@gmail.com",
    icon: EmailIcon,
  },
  {
    link: "https://x.com/abdulelahabacar",
    icon: TwitterIcon,
  },
  {
    link: "https://instagram.com/a2.b32",
    icon: InstagramIcon,
  },
  {
    link: "https://Github.com/abdulelah-abacar",
    icon: GithubIcon,
  },
  {
    link: "https://linkedin.com/in/abdulelah-abacar",
    icon: LinkedinIcon,
  },
];

function ContactIcons() {
  return (
    <>
      {contactIcons.map((icon, i) => (
        <a
          href={icon.link}
          target="_blank"
          key={i}
          className="text-inherit h-10 w-10 rounded-full cursor-pointer hover:scale-125 hover:bg-slate-50 dark:hover:bg-slate-900 duration-500 border-slate-300 border border-solid flex items-center justify-center p-2"
        >
          <icon.icon color={"currentColor"} />
        </a>
      ))}
    </>
  );
}

export default ContactIcons;
