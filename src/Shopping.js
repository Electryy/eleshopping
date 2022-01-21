import ShoppingList from "./ShoppingList";

function Shopping() {
  return (
    <div className="w-full">
      <h1 className="text-3xl mb-3">Shopping List</h1>
      <div className="card card-bordered shadow-lg">
        <div className="card-body">
          <h2 className="card-title">No Images</h2>
          <ShoppingList />
        </div>
      </div>
    </div>
  );
}

export default Shopping;
