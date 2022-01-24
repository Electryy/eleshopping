import { PlusIcon } from "@heroicons/react/solid";

function AddItemBtn() {
  return (
    <button className="btn mt-4">
      <PlusIcon className="w-5 mr-2" />
      Add item
    </button>
  );
}

export default AddItemBtn;
