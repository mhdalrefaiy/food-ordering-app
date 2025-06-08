import toast from "react-hot-toast";

export function validateMenuItem(data) {
  if (!data.image) {
    toast.error("Image is required.");
    return false;
  }

  if (!data.name || data.name.trim() === "") {
    toast.error("Name is required.");
    return false;
  }

  if (!data.basePrice || isNaN(data.basePrice)) {
    toast.error("Base price must be a valid number.");
    return false;
  }

  if (!data.description) {
    toast.error("Description is required.");
    return false;
  }

  return true; // All checks passed
}