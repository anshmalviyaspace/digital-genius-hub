import StaggeredMenu from "@/components/StaggeredMenu";
import logoImg from "@/assets/logo.png";

const navItems = [
  { label: "Ventures",   ariaLabel: "View my ventures",    link: "#projects"   },
  { label: "Craft",      ariaLabel: "View my capabilities", link: "#services"  },
  { label: "Principles", ariaLabel: "Learn about me",      link: "#about"      },
  { label: "Dispatch",   ariaLabel: "Read my newsletter",  link: "#newsletter" },
  { label: "Contact",    ariaLabel: "Get in touch",        link: "#contact"    },
];

const socialItems = [
  { label: "LinkedIn",  link: "https://www.linkedin.com/in/imanshmalviya/" },
  { label: "Twitter",   link: "https://x.com/imanshmalviya/"               },
  { label: "Instagram", link: "https://www.instagram.com/imanshmalviya/"   },
  { label: "Strava",    link: "https://strava.app.link/JbMyf0BVo2b"        },
];

const Logo = () => (
  <span className="kage-brand" aria-label="Ansh Malviya, home">
    <img src={logoImg} alt="Ansh Malviya" className="kage-brand-logo" draggable={false} />
  </span>
);

const Navbar = () => (
  <StaggeredMenu
    position="right"
    items={navItems}
    socialItems={socialItems}
    displaySocials
    displayItemNumbering
    colors={["#090909", "#050505"]}
    accentColor="#ff7a1a"
    menuButtonColor="#ffffff"
    openMenuButtonColor="#ffffff"
    changeMenuColorOnOpen={false}
    isFixed
    closeOnClickAway
    logoContent={<Logo />}
  />
);

export default Navbar;
