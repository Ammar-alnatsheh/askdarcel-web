/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { PortalWithState } from 'react-portal';
import CategoriesItem from './CategoriesItem';
import AddCategory from './AddCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from '../../Admin.module.scss';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedCategory: null,
    });
  }

  selectCategory(id) {
    // function to track the selected category by id or null if all not selected
    this.setState({ selectedCategory: id }, () => {
      console.log(`selected Category is ${this.state.selectedCategory}`);
    });
  }

  render() {
    return (
      <Accordion
        defaultActiveKey={this.state.selectedCategory}
        onSelect={this.selectCategory}
        className={Style.CategoriesList}
      >
        <Card>
          <Card.Header>
            <span className={Style.CategoriesListHeader}>
                Top Level Categories
            </span>
            <PortalWithState closeOnOutsideClick closeOnEsc>
              {({ openPortal, closePortal, isOpen, portal }) => (
                <React.Fragment>
                  <span className={Style.AddCategory} onClick={openPortal}>+ Add Category</span>
                  {portal(
                    <div className={Style.portal}>
                    <AddCategory addCategory={this.props.addCategory}/>
                    </div>
                  )}
                </React.Fragment>
              )}
            </PortalWithState>
          </Card.Header>
        </Card>
        {this.props.categories.map(category => (
          <CategoriesItem
            key={category.id}
            eventKey={category.id}
            category={category}
            selectedCategory={this.state.selectedCategory}
          />
        ))}
      </Accordion>
    );
  }
}

export default CategoriesList;
