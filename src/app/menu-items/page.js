"use client";

import UserTabs from "@/components/layout/user-tabs";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={data.admin} />
      <form className="mt-8 max-w-md mx-auto">
        <div className="flex items-end gap-2" >
            <div className="grow" >
                <label>Menu item name</label>
                <input type="text" />
            </div>
        </div>
      </form>
    </section>
  );
}
