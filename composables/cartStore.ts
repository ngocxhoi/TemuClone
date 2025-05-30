import type { CartItems } from "~/server/database/schema";
import type { GetCartItemsResponse } from "~/types/response";

export const useCartStore = () => {
  const auth = useAuth();
  const cartItems = useState("cartItems", () => [] as CartItems[]);
  const totalPrice = useState("totalPrice", () => 0);

  async function getItems() {
    if (!auth.loggedIn) return;
    const itemsRes = await $fetch<GetCartItemsResponse>("/api/db/cart/items", {
      method: "GET",
      query: {
        email: auth.user?.email,
      },
    });
    cartItems.value = itemsRes.items;
  }

  async function updateItem(cartItemId: number, quantity: number) {
    await $fetch("/api/db/cart/item", {
      method: "PUT",
      body: {
        cartItemId,
        quantity,
      },
    });
  }

  async function addItem(productId: number | string) {
    await $fetch("/api/db/cart/items", {
      method: "POST",
      body: {
        email: auth.user?.email,
        productId,
        quantity: 1,
      },
    });
    await getItems();
  }

  async function removeItem(cartItemId: number) {
    await $fetch("/api/db/cart/item", {
      method: "DELETE",
      body: {
        cartItemId,
      },
    });
    await getItems();
  }

  function totalPriceFunc(price: number, id?: number, quantity?: number) {
    totalPrice.value += price;

    if (id && quantity) {
      cartItems.value = cartItems.value.map((item) => {
        if (item.id === id) {
          item.quantity = quantity;
        }
        return item;
      });
    }
  }

  return {
    cartItems,
    totalPrice,
    getItems,
    updateItem,
    totalPriceFunc,
    addItem,
    removeItem,
  };
};
