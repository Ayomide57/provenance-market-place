"use client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Dropzone, { useDropzone } from "react-dropzone";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { upload } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import toast from "react-hot-toast";

interface IUploadFile {
  updateLink: (value: string[]) => void;
}
const clientId = process.env.NEXT_PUBLIC_ClIENT_ID2 || "";

export const client = createThirdwebClient({
  clientId: clientId,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UploadToStorage = ({ updateLink }: IUploadFile) => {

  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    let file: any = event.currentTarget.files && event.currentTarget.files[0];
    let uris = await upload({ client, files: [file] });
    uris = uris.replace("ipfs://", "https://ipfs.io/ipfs/");
    toast.success(uris);
    updateLink([uris]);
  };
  return (
    <label htmlFor="myfile">
      <div className={styles.logo}>
        <Image src="/upload.png" alt="upload Logo" height={100} width={250} />
      </div>
      <input
        className="h-[80px]"
        id="myfile"
        type="file"
        accept="application/msword,text/plain, application/pdf"
        style={{ display: "none" }}
        onChange={(event) => uploadFile(event)}
      />
    </label>
  );
};

export const UploadImages = ({ updateLink }: IUploadFile) => {
  const maxLength: number = 4;
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: maxLength,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      //maxSize: 2048,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });
  const UploadAllImages = useCallback(async () => {
    const files: any = acceptedFiles;

    const uris = await upload({ client, files: [...files] });
    if (uris) {
      for (let index = 0; index < uris?.length; index++) {
        const link = uris[index];
        uris[index] = link.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
      updateLink(uris);
      toast.success("Files uploaded successfully");
    }
  }, [acceptedFiles, updateLink]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      UploadAllImages();
    }
  }, [UploadAllImages, acceptedFiles]);

  return (
    <div className="mx-auto my-auto border-4 border-dashed border-blue-950">
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag `n` drop some files here, or click to select files</p>
          <em>(Maximum number of files: {maxLength})</em>
          <br />
          <em>(Maximum file size: 2048)</em>
        </div>
        <aside>
          {acceptedFiles.length > 0 && (
            <div>
              <h4>Selected files</h4>
              <ul>{acceptedFileItems}</ul>
            </div>
          )}
          {fileRejections.length > 0 && (
            <div>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};
