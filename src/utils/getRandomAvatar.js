import { avatarBgColors, userAvatarMap } from "../data/constants";

const getRandomAvatar = () => {
  const bgColorIndex = Math.floor(Math.random() * avatarBgColors.length);
  const bgColor = avatarBgColors[bgColorIndex];
  const avatarIndex = Math.floor(Math.random() * userAvatarMap.get(bgColor).length);
  const avatar = userAvatarMap.get(bgColor)[avatarIndex];

  return { avatar: avatar.url, bgColor, name: avatar.name };
};

export default getRandomAvatar;