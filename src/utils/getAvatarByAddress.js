import { avatarBgColors, avatars } from "../data/constants";
import getRandomAvatar from "./getRandomAvatar";

const getAvatarByAddress = (address) => {
  if (!address || !address?.startsWith('0x')) return getRandomAvatar();

  const trimmedAddress = address.slice(2);
  const firstPart = trimmedAddress.slice(0, 4);
  const lastPart = trimmedAddress.slice(-4);

  // 16 進制轉 10 進制
  const firstDecimal = parseInt(firstPart, 16);
  const lastDecimal = parseInt(lastPart, 16);

  const max = 65535; // 4 個 16 進制字符的最大值是 FFFF（16 進制），轉換為十進制是 65535
  const userAvatarIndex = Math.floor((firstDecimal / max) * avatars.length);
  const bgColorIndex = Math.floor((lastDecimal / max) * avatarBgColors.length);
  const avatarImage = avatars[userAvatarIndex].url;
  const bgColor = avatarBgColors[bgColorIndex];
  
  return { avatarImage, bgColor, name: avatars[userAvatarIndex].name };
};

export default getAvatarByAddress;