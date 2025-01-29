import countries from "world-countries";

export const formattedCountries = countries.map((country) => ({
  label: `${country.name.common}`, // Show flag & name
  value: country.name.common,
}));

export const carBrands = [
  { label: "Toyota", value: "toyota" },
  { label: "Honda", value: "honda" },
  { label: "Ford", value: "ford" },
  { label: "BMW", value: "bmw" },
  { label: "Mercedes-Benz", value: "mercedes" },
  { label: "Audi", value: "audi" },
  { label: "Tesla", value: "tesla" },
  { label: "Chevrolet", value: "chevrolet" },
  { label: "Nissan", value: "nissan" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Volkswagen", value: "volkswagen" },
  { label: "Porsche", value: "porsche" },
  { label: "Lexus", value: "lexus" },
  { label: "Subaru", value: "subaru" },
  { label: "Mazda", value: "mazda" },
  { label: "Jeep", value: "jeep" },
];
