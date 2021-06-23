import React from 'react';
import Style from '../../Admin.module.scss';

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        categoryName : "",
    }
    this.editCategory = this.editCategory.bind(this);
  }

  Category(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
    <form className={Style.AddCategoryForm} onSubmit={this.editCategory}>
        <label>This is the Edit Category dummy Portal</label>
        <input type="text" name="name"></input>
        <br></br>
        <button type="submit">Edit Category</button>
        <button type="submit">Delete Category</button>
        <br></br>
        <label>ESC or click outside to close</label>
    </form>
  )}
}

export default EditCategory;