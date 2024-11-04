import "./App.css";
import { mockEvmAddress } from "./data/mockAddress";
import React, { useState, useEffect } from "react";
import getAvatarByAddress from "./utils/getAvatarByAddress";
import { avatars, avatarBgColors, socialLinks } from "./data/constants";
import UserItem from "./components/UserItem";
import { isAddress } from "web3-validator";

// cache the avatar image
const avatarCache = new Map();

function App() {
  const [addressList, setAddressList] = useState(mockEvmAddress);
  const [character, setCharacter] = useState("");
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 300);
    }
  }, [value]);

  const handleAddUser = () => {
    const address = value;
    if (!address || !isAddress(address)) return setError("Please enter a valid address");
    setAddressList(prev => [address, ...prev]);
    setValue("");
  };

  return (
    <div className="relative bg-gray-100">
      <div className="w-full text-gray-600 flex justify-between items-center h-[80px] text-lg font-bold sticky top-0 bg-white md:px-8 px-2 shadow-md">
        <div className="flex md:gap-4 gap-2 items-center">
          <img
            src="/images/chiikawa.webp"
            alt="avatar"
            className="rounded-full border border-gray-200 shadow-md w-10 h-10 object-cover"
          />
          User List
        </div>
        <div className="flex md:gap-4 gap-2 items-center">
          {socialLinks.map((item, index) => (
            <a href={item?.url} target="_blank" key={`${index}-${item?.name}`} >
              {item?.icon({ size: 24 })}
            </a>
          ))}
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col-reverse justify-between md:h-[calc(100vh-80px)] overflow-hidden gap-2 max-w-[1200px] m-auto">
        <div className="flex flex-col items-start gap-4 p-5 bg-white md:w-1/2 h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar">
          {addressList.map((address, index) => {
            if (!avatarCache.has(address)) {
              avatarCache.set(address, getAvatarByAddress(address));
            }
            const { avatarImage, bgColor, name } = avatarCache.get(address);
            if (character || color) {
              if ((character && avatarImage !== character) || (color && bgColor !== color)) {
                return null;
              }
            }
            return (
              <UserItem
                key={`${address}-${index}`}
                index={index}
                address={address}
                avatarImage={avatarImage}
                bgColor={bgColor}
                name={name}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-start gap-4 p-5 bg-gray-100 md:w-1/2">
          <div>
            <span>Character:</span>
            <div className="flex md:gap-4 gap-1 flex-wrap mt-2">
              {avatars.map((avatar, index) => {
                const isActivated = character === avatar.url;
                return (
                  <button
                    onClick={() => setCharacter(prev => prev === avatar.url ? "" : avatar.url)}
                    key={`${avatar.name}-${index}`}
                    className="flex items-center gap-2 rounded-lg md:px-2 px-1 py-1 shadow-md max-w-[140px] border-none hover:shadow-lg duration-200 ease-in-out transition-all"
                    style={{
                      backgroundColor: isActivated ? "#5e5e5e" : "#fff",
                      color: isActivated ? "#fff" : "#5e5e5e",
                      
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="avatar"
                      className="rounded-full w-9 h-9 object-cover bg-white"
                    />
                    <span className="md:block hidden">{avatar.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span>Color:</span>
            <div className="flex md:gap-4 gap-1 mt-2 flex-wrap">
              {avatarBgColors.map((_color, index) => {
                const isActivated = color === _color;
                return (
                  <button
                    onClick={() => setColor(prev => prev === _color ? "" : _color)}
                    key={`${_color}-${index}`}
                    className="flex items-center gap-4 rounded-lg md:p-2 p-4 shadow-md md:w-[100px] border-none hover:shadow-lg duration-200 ease-in-out transition-all"
                    style={{
                      backgroundColor: isActivated ? "#f0f0f0" : _color,
                      border: isActivated ? `1px solid ${_color}` : "1px solid #fff",
                    }}
                  >
                    <span className="m-auto md:block hidden" style={{ color: isActivated ? _color : "#fff" }}>
                      {_color}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            Add New User:
            <input
              type="text"
              className="border border-gray-400 rounded-lg px-2 py-1 w-full mt-2 vocus:ring-2 focus:outline-none"
              placeholder="Enter user address"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleAddUser()
              }}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
