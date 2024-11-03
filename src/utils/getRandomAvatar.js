import { avatarBgColors, avatars } from "../data/constants";

const getRandomAvatar = () => {
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  const bgColor = avatarBgColors[Math.floor(Math.random() * avatarBgColors.length)];
  return { avatar: avatar.url, bgColor, name: avatar.name };
};
const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default getRandomAvatar;