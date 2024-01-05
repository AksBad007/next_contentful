import { createClient } from "contentful";
import RecipeCard from "@/components/RecipeCard";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function getRecipes() {
  const { items } = await client.getEntries({ content_type: "recipe" });
  return items;
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl">Cooking Blog</h1>

      <div className="mt-8 flex flex-wrap gap-12">
        {recipes.map(({ fields, sys }) => (
          <RecipeCard key={sys.id} recipe={fields} />
        ))}
      </div>
    </main>
  );
}
