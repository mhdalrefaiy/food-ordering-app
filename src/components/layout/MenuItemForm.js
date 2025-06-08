"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

  return (
    <form
      onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
      className="mt-8 max-w-md mx-auto"
    >
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
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            value={description}
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Base price</label>
          <input
            value={basePrice}
            required
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setBasePrice(value);
              }
            }}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
