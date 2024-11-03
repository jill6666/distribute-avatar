import "./App.css";
import { mockEvmAddress } from "./data/mockAddress";
import React, { useState, useEffect } from "react";
import getAvatarByAddress from "./utils/getAvatarByAddress";
import shortenAddress from "./utils/shortenAddress";
import { avatars, avatarBgColors } from "./data/constants"; 

// cache the avatar image
const avatarCache = new Map();

function App() {
  const [addressList, setAddressList] = useState(mockEvmAddress);
  const [character, setCharacter] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    console.log({ character, color });
    if (!character && !color) setAddressList(mockEvmAddress);
    else setAddressList(mockEvmAddress.filter((address) => {
      if (!avatarCache.has(address)) avatarCache.set(address, getAvatarByAddress(address));
      const { avatarImage, bgColor } = avatarCache.get(address);
      return (!character || avatarImage === character) && (!color || bgColor === color);
    }));
  }, [character, color]);

  return (
    <div style={{
        position: "relative",
      }}
    >
      <div style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          position: "sticky",
          top: "0",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          width: "100%",
          padding: "0 20px",
          color: "#3e3e3e",
        }}
      >
        <img
          src="/images/chiikawa.webp"
          alt="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid #3e3e3e",
            marginRight: "10px",
          }}
        />
        User List
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "calc(100vh - 100px)",
          backgroundColor: "#f0f0f0",
          overflowY: "hidden",
        }}
      >
        <div style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
          padding: "20px",
          backgroundColor: "#fff",
          height: "calc(100vh - 140px)",
          overflowY: "scroll",
        }}>
          {addressList.map((address, index) => {
            if (!avatarCache.has(address)) {
              avatarCache.set(address, getAvatarByAddress(address));
            }
            const { avatarImage, bgColor, name } = avatarCache.get(address);
            return (
              <div
                key={`${address}-${index}`}
                className="avatar"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ width: "24px" }}>{index + 1}</span>
                  <img
                    src={avatarImage}
                    alt="avatar"
                    style={{
                      backgroundColor: bgColor,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <span style={{
                    display: "block",
                    marginTop: "10px",
                    color: "#000",
                    textAlign: "center",
                  }}>
                    {shortenAddress(address)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span>{name}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "60%",
            padding: "20px",
            backgroundColor: "#f0f0f0",
            height: "calc(100vh - 140px)",
            overflowY: "scroll",
          }}
        >
          <div>
            <span>Character:</span>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {avatars.map((avatar, index) => {
                const isActivated = character === avatar.url;
                return (
                  <button
                    onClick={() => setCharacter(prev => prev === avatar.url ? "" : avatar.url)}
                    key={`${avatar.name}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      padding: "0px 10px",
                      border: "none",
                      boxShadow: isActivated ? "0 2px 4px 0 rgba(0, 0, 0, 0.1)" : "none",
                      fontWeight: isActivated ? "bold" : "normal",
                      minWidth: "140px",
                    }}
                  >
                    <img
                      src={avatar.url}
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        paddingBottom: "10px",
                      }}
                    />
                    <span>{avatar.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span>Color:</span>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {avatarBgColors.map((_color, index) => {
                const isActivated = color === _color;
                return (
                  <button
                    onClick={() => setColor(prev => prev === _color ? "" : _color)}
                    key={`${_color}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "12px",
                      padding: "10px 10px",
                      width: "100px",
                      backgroundColor: isActivated ? "#f0f0f0" : _color,
                      border: isActivated ? `1px solid ${_color}` : "1px solid #fff",
                    }}
                  >
                    <span
                      style={{
                        margin: "0 auto",
                        color: isActivated ? _color : "#fff",
                      }}
                    >
                      {_color}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
