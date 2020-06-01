import React, { Component } from 'react';
import { BaseModal } from './Modal';
import * as dataService from '../../../utils/DataService';

import styles from './ServiceDiscoveryModal.scss';


class ServiceDiscoveryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eligibilities: [],
      subcategories: [],
      checkedItems: {},
    };
  }

  componentDidMount() {
    const { categoryId } = this.props;

    dataService.get(`api/eligibilities?category_id=${categoryId}`).then(response => {
      const { eligibilities } = response;
      this.setState({
        eligibilities,
      });
    });

    dataService.get(`api/categories/subcategories?id=${categoryId}`).then(response => {
      const { categories } = response;
      this.setState({
        subcategories: categories,
      });
    });
  }

  handleCheckboxClick(optionId) {
    const { checkedItems } = this.state;
    checkedItems[optionId] = !checkedItems[optionId];
  }

  render() {
    const { isEligibility } = this.props;
    const { eligibilities, subcategories, checkedItems } = this.state;

    const options = isEligibility ? eligibilities : subcategories;

    const modalContent = (
      <div className={styles.contentContainer}>
        <h1>Tell us more about you</h1>
        <h2>{isEligibility ? 'Please select the best that apply to your situation.' : 'What are you currently looking for? Select all that apply.'}</h2>
        <ul>
          {options.map(option => (
            <li className={styles.listOption} key={option.id}>
              <label>
                <input
                  type="checkbox"
                  checked={checkedItems[option.id]}
                  onChange={() => this.handleCheckboxClick(option.id)}
                />
                <span>{option.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <BaseModal
        isFullScreen
        backButtonText="All resource guides"
        modalContent={modalContent}
        {...this.props}
      />
    );
  }
}
export default ServiceDiscoveryModal;