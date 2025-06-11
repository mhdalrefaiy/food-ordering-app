import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  console.log("user", user);
  console.log("loggedInUserData", loggedInUserData);

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            admin: loggedInUserData.admin && loggedInUserData._id === user._id ? loggedInUserData.admin : admin,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <label>First and last name </label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>First and last name </label>
        <input type="email" disabled={true} value={user?.email} />
        <label>Phone number </label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Street address </label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Postal code </label>
            <input
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label>Country </label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <label>City </label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                disabled={
                  loggedInUserData.admin && loggedInUserData._id === user._id
                }
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
