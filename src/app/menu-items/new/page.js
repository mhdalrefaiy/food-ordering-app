"use client";
import UserTabs from "@/components/layout/user-tabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useState } from "react";
import Left from "@/components/icons/left";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";
import {validateMenuItem} from '@/utils/validateMenuItem'

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handeFormSubmit(e, data) {
    e.preventDefault();

    if(!validateMenuItem(data)) {
      return
    }

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        const errorText = await response.text();
        reject(new Error(errorText || "Failed to save menu item"));
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading menu info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={data.admin} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handeFormSubmit} menuItem={null} />
    </section>
  );
}
