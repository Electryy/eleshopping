import { PencilAltIcon } from "@heroicons/react/solid";
import Recipe from "./Recipe";

function Recipes() {
  return (
    <div className="flex flex-wrap gap-4">
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  );
}

export default Recipes;
