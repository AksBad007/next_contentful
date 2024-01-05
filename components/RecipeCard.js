import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe;

  return (
    <div className="flex flex-col justify-between">
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
        alt={title}
      />

      <div className="my-4">
        <div className="mt-2 mb-4">
          <h4 className="text-2xl my-2">{title}</h4>
          <p>Takes around {cookingTime} mins</p>
        </div>

        <Link
          className="bg-blue-500 rounded hover:bg-blue-700 my-2 font-bold p-2"
          href={`/recipes/${slug}`}
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
