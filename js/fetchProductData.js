export async function getProducts() {
  try {
    const response = await fetch(
      "https://ecommerce-api-seven-omega.vercel.app/products"
    );
    if (!response.ok) {
      throw new Error("Något gick fel vid hämtning av produkterna");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("fel vid hämtning av produkter:", error);
  }
}
