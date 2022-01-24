import { PlusIcon } from "@heroicons/react/solid";

function AddItemBtn() {
  return (
    <div className="flex ml-[64px] label justify-start">
      <PlusIcon className="w-10 mr-5" />
      <span className="text-xl">Add item</span>
    </div>
  );
}

export default AddItemBtn;
