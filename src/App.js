import "./App.css";
import { mockEvmAddress } from "./data/mockAddress";
import React, { useState, useEffect } from "react";
import getAvatarByAddress from "./utils/getAvatarByAddress";
import { avatars, avatarBgColors } from "./data/constants";
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
    <div className="relative">
      <div className="w-full text-gray flex justify-start items-center h-[80px] text-lg font-bold sticky top-0 bg-white px-4 shadow-md">
        <img
          src="/images/chiikawa.webp"
          alt="avatar"
          className="rounded-full border border-gray-400 mr-3 shadow-md w-10 h-10 object-cover"
        />
        User List
      </div>
      <div className="w-full flex md:flex-row flex-col-reverse justify-between md:h-[calc(100vh-80px)] bg-gray-100 overflow-hidden gap-2">
        <div className="flex flex-col items-start gap-4 p-5 bg-white md:w-2/5 h-[calc(100vh-80px)] overflow-y-scroll">
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
        <div className="flex flex-col items-start gap-4 p-5 bg-gray-100 md:w-3/5">
          <div>
            <span>Character:</span>
            <div className="flex md:gap-4 gap-1 flex-wrap mt-2">
              {avatars.map((avatar, index) => {
                const isActivated = character === avatar.url;
                return (
                  <button
                    onClick={() => setCharacter(prev => prev === avatar.url ? "" : avatar.url)}
                    key={`${avatar.name}-${index}`}
                    className="flex items-center gap-4 rounded-lg md:px-2 px-1 py-1 shadow-md max-w-[140px] border-none"
                    style={{ backgroundColor: isActivated ? "#f0f0f0" : "#fff" }}
                  >
                    <img
                      src={avatar.url}
                      alt="avatar"
                      className="rounded-full w-10 h-10 object-cover"
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
                    className="flex items-center gap-4 rounded-lg md:p-2 p-4 shadow-md md:w-[100px] border-none"
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
              className="border border-gray-400 rounded-lg px-2 py-1 w-full mt-2"
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
