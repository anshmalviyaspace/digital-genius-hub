import StaggeredMenu from "@/components/StaggeredMenu";
import logoImg from "@/assets/logo.svg";

const navItems = [
  { label: "Work",       ariaLabel: "View my work",        link: "#projects"   },
  { label: "Services",   ariaLabel: "View my services",    link: "#services"   },
  { label: "About",      ariaLabel: "Learn about me",      link: "#about"      },
  { label: "Newsletter", ariaLabel: "Read my newsletter",  link: "#newsletter" },
  { label: "Contact",    ariaLabel: "Get in touch",        link: "#contact"    },
];

const socialItems = [
  { label: "LinkedIn",  link: "https://www.linkedin.com/in/imanshmalviya/" },
  { label: "Twitter",   link: "https://x.com/imanshmalviya/"               },
  { label: "Instagram", link: "https://www.instagram.com/imanshmalviya/"   },
  { label: "Strava",    link: "https://strava.app.link/JbMyf0BVo2b"        },
];

const Logo = () => (
  <img
    src={logoImg}
    alt="Ansh Malviya"
    className="h-10 w-auto object-contain"
    draggable={false}
  />
);

const Navbar = () => (
  <StaggeredMenu
    position="right"
    items={navItems}
    socialItems={socialItems}
    displaySocials
    displayItemNumbering
    colors={["hsl(0 0% 8%)", "hsl(0 0% 5%)"]}
    accentColor="#f97316"
    menuButtonColor="#ffffff"
    openMenuButtonColor="#ffffff"
    changeMenuColorOnOpen={false}
    isFixed
    closeOnClickAway
    logoContent={<Logo />}
  />
);

export default Navbar;
