import { FaGithub } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";

export const avatars = [
    {
        name: "Chiikawa",
        url: "/images/chiikawa.webp"
    },
    {
        name: "Hachi",
        url: "/images/hachi.webp"
    },
    {
        name: "Kuri",
        url: "/images/kuri.webp"
    },
    {
        name: "Momo",
        url: "/images/momo.webp"
    },
    {
        name: "Shisa",
        url: "/images/shisa.webp"
    },
    {
        name: "Usagi",
        url: "/images/usagi.webp"
    },
];
export const avatarBgColors = [
    "#FFC0CB",
    "#FFA07A",
    "#FFD700",
    "#FF69B4",
    "#FF6347",
    "#FF4500",
];
export const mediumUrl = "https://medium.com/@jill6666/distribute-unique-avatar-to-evm-address-without-a-database-javascript-7bdc8bf48c56";
export const githubUrl = "https://github.com/jill6666/distribute-avatar";

// The avatars are evenly distributed across categories, ensuring a balanced and visually diverse set of avatars
export const userAvatarMap = new Map(avatarBgColors.map((color) => [color, avatars]));

export const socialLinks = [
    {
        name: "Medium",
        url: mediumUrl,
        icon: FaMedium,
    },
    {
        name: "GitHub",
        url: githubUrl,
        icon: FaGithub,
    },
];