"use client";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/user-tabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useState } from "react";
import Left from "@/components/icons/left"
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false)
  const { loading, data } = useProfile();

  async function handeFormSubmit(e) {
    e.preventDefault();
    const data = { image, name, description, basePrice };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
    setRedirectToItems(true)
  }

  if(redirectToItems) {
    return redirect('/menu-items')
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={data.admin} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form onSubmit={handeFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="md:grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>item name</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Base price</label>
            <input
              value={basePrice}
              type="text"
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
