import { PlusIcon } from "@heroicons/react/solid";

function AddItemBtn(props) {
  return (
    <button className="btn mt-4" onClick={props.addItem}>
      <PlusIcon className="w-5 mr-2" />
      Add item
    </button>
  );
}

export default AddItemBtn;
