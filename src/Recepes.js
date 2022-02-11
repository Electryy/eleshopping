import { PencilAltIcon } from "@heroicons/react/solid";
import Recipe from "./Recipe";

function Recipes(props) {
  const { recipes } = { ...props };
  console.log(recipes);
  return (
    <div className="flex flex-wrap gap-4">
      {recipes.map((item, index) => (
        <Recipe key={index} item={item} />
      ))}
    </div>
  );
}

export default Recipes;
