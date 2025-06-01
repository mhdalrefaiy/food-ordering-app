"use client";
import UserTabs from "@/components/layout/user-tabs";
import { useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryNewName, setNewCategoryName] = useState("");
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return "Loading info...";
  }

  if (!profileData) {
    return "Not an admin";
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryNewName }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: 'Creating your new category...',
      success: 'Category created!',
      error: 'Failed to create category'
    })
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>New category name</label>
            <input
              type="text"
              value={categoryNewName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
