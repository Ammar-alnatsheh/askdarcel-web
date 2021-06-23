/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { PortalWithState } from 'react-portal';
import EditSubCategory from './EditSubCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from '../../Admin.module.scss';

const SubcategoriesItem = props => {
  const isSelected = props.subCategory.id === props.selectedSubcategory;
  return (
    <ListGroup.Item
      className={Style.Subcategory}
      action
      onClick={() => props.selectSubcategory(props.subCategory.id)}
    >
      <div className={Style.CategoryName}>{props.subCategory.name}</div>
      <div className={Style.CategorySpacer} />
      {isSelected ?<PortalWithState closeOnOutsideClick closeOnEsc>
              {({ openPortal, closePortal, isOpen, portal }) => (
                <React.Fragment>
                  <div className={Style.EditSubcategory} onClick={openPortal}>Edit Subcategory</div>
                  {portal(
                    <div className={Style.portal}>
                    <EditSubCategory />
                    </div>
                  )}
                </React.Fragment>
              )}
            </PortalWithState> : null
        }
    </ListGroup.Item>
  );
};

export default SubcategoriesItem;
