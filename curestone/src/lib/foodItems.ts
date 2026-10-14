import { sanityFetch } from "./sanity";
import type { FoodItem } from "./dietPlanner/types";

const imageFields = `
  asset->{_id,url,metadata{lqip,dimensions{width,height,aspectRatio}}},
  alt,
  caption
`;

const foodItemFields = `
  _id,
  name,
  "slug": slug.current,
  image{${imageFields}},
  category,
  oxalateLevel,
  purineLevel,
  sodiumLevel,
  isAnimalProtein,
  isCalciumRich,
  dietaryType,
  clinicalNote
`;

export async function fetchActiveFoodItems(): Promise<FoodItem[]> {
  return sanityFetch<FoodItem[]>({
    query: `*[_type == "foodItem" && isActive != false] | order(name asc){${foodItemFields}}`,
  });
}
