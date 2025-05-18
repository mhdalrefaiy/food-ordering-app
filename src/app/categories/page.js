"use client";
import UserTabs from "@/components/layout/user-tabs";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setAdmin(data.admin);
      });
    });
  }, []);

  if(!admin) {
    return 'Not an admin'
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs admin={true} />
    </section>
  );
}
