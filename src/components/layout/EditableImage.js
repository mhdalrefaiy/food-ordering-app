import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileCHange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) {
          const { link } = await response.json();
          setLink(link);
          resolve();
        } else {
          reject();
        }
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload completed",
        error: "Upload error",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded w-full h-full mb-2"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}

      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileCHange} />
        <span className="block border border-gray-300 p-2 text-center rounded-lg cursor-pointer ">
          Change image
        </span>
      </label>
    </>
  );
}
