import { avatarBgColors, userAvatarMap } from "../data/constants";
import getRandomAvatar from "./getRandomAvatar";
import { isAddress } from "web3-validator";

const getAvatarByAddress = (address) => {
  if (!address || !isAddress(address)) return getRandomAvatar();

  const trimmedAddress = address.slice(2);
  const firstPart = trimmedAddress.slice(0, 4);
  const lastPart = trimmedAddress.slice(-4);

  // Convert hexadecimal to decimal
  const firstDecimal = parseInt(firstPart, 16);
  const lastDecimal = parseInt(lastPart, 16);

  const max = 65535; // Maximum decimal value for 4 hex characters (FFFF)
  const bgColorIndex = Math.floor((firstDecimal / max) * avatarBgColors.length);
  const bgColor = avatarBgColors[bgColorIndex];
  const userAvatarIndex = Math.floor((lastDecimal / max) * userAvatarMap.get(avatarBgColors[bgColorIndex]).length);
  const avatar = userAvatarMap.get(avatarBgColors[bgColorIndex])[userAvatarIndex];
  
  return { avatarImage: avatar.url, bgColor, name: avatar.name };
};

export default getAvatarByAddress;