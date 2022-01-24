import { DotsVerticalIcon } from "@heroicons/react/solid";

function CheckboxItem(props) {
  return (
    <label className="cursor-pointer label justify-start">
      <DragIcon />
      <input name={props.id} type="checkbox" className="checkbox checkbox-lg mr-5" checked={props.checked} onChange={() => props.handleChange(props.id)} />
      <span className="label-text text-xl">{props.label}</span>
    </label>
  );
}

function DragIcon() {
  return (
    <div className="mr-5 flex">
      <DotsVerticalIcon className="h-9 w-9 -mr-6" />
      <DotsVerticalIcon className="h-9 w-9" />
    </div>
  );
}

export default CheckboxItem;
