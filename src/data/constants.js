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

// The avatars are evenly distributed across categories, ensuring a balanced and visually diverse set of avatars
export const userAvatarMap = new Map(avatarBgColors.map((color) => [color, avatars]));