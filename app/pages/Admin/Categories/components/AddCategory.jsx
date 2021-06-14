import React from 'react';
import Style from '../../Admin.module.scss';

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        categoryName : "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let name = event.target.name.value || '';
    this.props.addCategory(name);
  }

  render() {
    return (
    <form className={Style.AddCategoryForm} onSubmit={this.handleChange}>
        <label></label>
        <label>Name</label>
        <input type="text" name="name"></input>
        <br></br>
        <button type="submit">Add Category</button>
        <br></br>
        <label>ESC or click outside to close</label>
    </form>
  )}
}

export default AddCategory;