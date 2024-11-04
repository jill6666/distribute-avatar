import React from "react";
import shortenAddress from "../utils/shortenAddress";

function UserItem({
  address,
  avatarImage,
  bgColor,
  name,
  index,
}) {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="w-4">{index + 1}</span>
        <img
          src={avatarImage}
          alt="avatar"
          className="rounded-full border border-gray-100 w-10 h-10 object-cover"
          style={{
            backgroundColor: bgColor,
          }}
        />
        <span className="block mt-2 text-center">
          {shortenAddress(address)}
        </span>
      </div>
      <span>{name}</span>
    </div>
  );
}

export default UserItem;
