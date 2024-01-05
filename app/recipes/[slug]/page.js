import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const getSingleRecipe = async (slug) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": slug,
  });
  return items[0];
};

const Recipe = async ({ params }) => {
  const recipe = await getSingleRecipe(params.slug);
  const { featuredImage, title, cookingTime, ingredients, method } = recipe.fields;

  return (
    <main className="p-24">
      <div className="flex flex-col items-center">
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          alt={title}
        />

        <h2 className="text-5xl mt-8">{title}</h2>
      </div>

      <div className="text-center my-2">
        <p className="mb-4">(Takes about {cookingTime} mins to make.)</p>

        {ingredients.map((ingredient) => (
          <span
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer me-4 py-1 px-2 rounded"
            key={ingredient}
          >
            {ingredient}
          </span>
        ))}
      </div>

      <div>
        <h3 className="text-3xl my-4">How to Make:</h3>

        <div className="flex flex-col gap-8">
          {documentToReactComponents(method)}
        </div>
      </div>
    </main>
  );
};

export default Recipe;
