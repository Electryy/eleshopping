function CheckboxItem(props) {
  return (
    <label className="cursor-pointer label justify-start">
      <input name={props.id} type="checkbox" className="checkbox checkbox-lg mr-5" checked={props.checked} onChange={() => props.handleChange(props.id)} />
      <span className="label-text text-xl">{props.label}</span>
    </label>
  );
}

export default CheckboxItem;
