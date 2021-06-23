import React from 'react';
import Style from '../../Admin.module.scss';

class EditSubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        categoryName : "",
    }
    this.editSubCategory = this.editSubCategory.bind(this);
  }

  editSubCategory(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
    <form className={Style.AddCategoryForm} onSubmit={this.editSubCategory}>
        <label>This is the Edit SubCategory dummy Portal</label>
        <input type="text" name="name"></input>
        <br></br>
        <button type="submit">Edit SubCategory</button>
        <button type="submit">delete SubCategory</button>
        <br></br>
        <label>ESC or click outside to close</label>
    </form>
  )}
}

export default EditSubCategory;