import React from "react";
import CheckboxItem from "./CheckboxItem";
import ClearCheckedBtn from "./ClearCheckedBtn";
import AddItemControls from "./AddItemControls";
import { v4 as uuid } from "uuid";
import { dbPush, dbPull, dbDelete } from "./firestore";
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /*
  async componentDidMount() {
    this.props.dataLoadingStarted();
    this.refresh().then((res) => {
      this.props.dataLoadingEnded();
    });
  }
*/

  render() {
    return (
      <div className="form-control">
        <AddItemControls addItem={this.props.addItem} />
        <ClearCheckedBtn clearChecked={this.props.clearChecked} />
        {this.props.shoppingList.map((item) => (
          <CheckboxItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            inputChanged={this.props.inputChanged}
            checkboxClicked={this.props.checkboxClicked}
            deleteItem={this.props.deleteItem}
            updateItem={this.props.updateItem}
          />
        ))}
      </div>
    );
  }
}

export default ShoppingList;
