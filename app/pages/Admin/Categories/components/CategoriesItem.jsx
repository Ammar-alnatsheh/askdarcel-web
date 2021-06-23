/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { PortalWithState } from 'react-portal';
import EditCategory from './EditCategory';
import SubcategoriesList from './SubcategoriesList';
import Style from '../../Admin.module.scss';
import down_arrow from '../../assets/down_arrow.png';
import right_arrow from '../../assets/right_arrow.png';
import no_arrow from '../../assets/no_arrow.png';

const CategoriesItem = props => {
  const subCategories = props.category.subCategories || [];
  const isSelected = props.category.id === props.selectedCategory;
  let arrowImage = no_arrow;
  if (subCategories.length > 0) {
    arrowImage = right_arrow;
    if (props.selectedCategory === props.eventKey) {
      arrowImage = down_arrow;
    }
  }

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
        <div className={Style.CategoryHeader}>
          <img className={Style.CategoriesListArrow} src={arrowImage} alt="" />
          <div className={Style.CategoryName}>{props.category.name}</div>
          <div className={Style.CategorySpacer} />
          {isSelected ? <PortalWithState closeOnEsc>
              {({ openPortal, closePortal, isOpen, portal }) => (
                <React.Fragment>
                  <div className={Style.EditCategory} onClick={e => {
                    openPortal();
                    e.stopPropagation();
                    }} >Edit Category</div>
                  {portal(
                    <div className={Style.portal}>
                    <EditCategory />
                    </div>
                  )}
                </React.Fragment>
              )}
            </PortalWithState> : null
          }
        </div>
      </Accordion.Toggle>
      {subCategories.length > 0 ? (
        <Accordion.Collapse eventKey={props.eventKey} className={Style.SubcategoryList}>
          <Card.Body>
            <SubcategoriesList subCategories={subCategories} />
          </Card.Body>
        </Accordion.Collapse>
      ) : null}
    </Card>
  );
};

export default CategoriesItem;
