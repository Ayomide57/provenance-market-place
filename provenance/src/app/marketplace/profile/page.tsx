"use client";
import { UploadImages } from "@/lib";
import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import UserSideBar from "@/components/UserSideBar";

const Profile = () => {
  const [links, updateLink] = useState<string[]>();

  useEffect(() => {
    console.log(links);
  })


  return (
    <div className="ml-16">
      <div className="grid grid-cols-3 gap-20">
        <div className=" h-full w-60 space-y-2 rounded-2xl border border-primary bg-sky-700/30 p-3 text-white backdrop-blur-xl">
          <h1 className="mb-5 text-center text-2xl font-extrabold">
            Balance
          </h1>
          <p className="text-center text-4xl font-bold">10</p>
        </div>
        <div className=" h-full w-60 space-y-2 rounded-2xl border border-primary bg-sky-700/30 p-3 text-white backdrop-blur-xl">
          <h1 className="mb-5 text-center text-2xl font-extrabold">
            Requests
          </h1>
          <p className="text-center text-4xl font-bold">10</p>
        </div>{" "}
        <div className=" h-full w-60 space-y-2 rounded-2xl border border-primary bg-sky-700/30 p-3 text-white backdrop-blur-xl">
          <h1 className="mb-5 text-center text-2xl font-extrabold">
            Properties
          </h1>
          <p className="text-center text-4xl font-bold">10</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

