import { toast } from "react-toastify";

export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    toast.info("Already in cart 🛒");
    return;
  }

  cart.push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));

  toast.success("Added to cart ✅");
}
