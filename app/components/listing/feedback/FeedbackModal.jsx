import React, { Fragment, useState } from 'react';
import { cloneDeep } from 'lodash';
import {
  VoteButtons,
  FeedbackTags,
  Review,
  SubmitMessage,
  NavigationButtons,
} from './FeedbackSteps';
import { TAG_LIST, UPVOTE, DOWNVOTE } from './constants';
import { addFeedback } from '../../../utils/DataService';

import { images } from '../../../assets';
import styles from './FeedbackModal.module.scss';

const FeedbackModal = ({ service, resource, closeModal }) => {
  const [vote, setVote] = useState('');
  const [tagOptions, setTags] = useState(TAG_LIST);
  const [review, setReview] = useState('');
  const [step, setStep] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVoteChange = voteType => {
    setStep(-1);
    setVote(voteType);
  };

  /**
   * Toggle selected tags state with given position
   *
   * @param {int} pos - position of tag in array of tagOptions.
  */
  const toggleSelectedTag = pos => {
    const updatedTags = cloneDeep(tagOptions);
    updatedTags[pos].selected = !updatedTags[pos].selected;
    setTags(updatedTags);
  };

  const handleReviewChange = e => {
    e.preventDefault();
    setReview(e.target.value);
  };

  const handlePrevStep = () => (
    setStep(prev => (vote === UPVOTE ? prev - 2 : prev - 1))
  );

  const handleNextStep = () => {
    if (!vote.length || step >= 1) return;
    if (vote === UPVOTE) {
      setStep(prev => prev + 2);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const tags = tagOptions
      .filter(({ selected }) => selected)
      .map(({ tag }) => tag);

    const feedback = {
      rating: vote,
      tags,
      review,
    };

    const url = !service
      ? `/api/resources/${resource.id}/feedbacks`
      : `/api/services/${service.id}/feedbacks`;

    addFeedback(url, feedback)
      .then(({ msg }) => {
        if (msg === 'Success!') setIsSubmitted(true);
      })
      .catch(err => console.log(err));
  };

  const isReviewRequired = (
    tagOptions.some(({ tag, selected }) => tag === 'Other' && selected)
    && vote === DOWNVOTE
  );

  const steps = [
    <FeedbackTags tagOptions={tagOptions} onSelectTag={toggleSelectedTag} />,
    <Review
      reviewValue={review}
      isReviewRequired={isReviewRequired}
      onReviewChange={handleReviewChange}
    />,
  ];

  return (
    <div className={styles.feedbackModalBody}>
      <div
        className={styles.closeModal}
        role="button"
        tabIndex="0"
        onClick={closeModal}
      >
        <img src={images.icon('close')} alt="close" />
      </div>
      <div className={styles.feedbackHeader}>
        <img src={images.icon('feedback-blue')} alt="feedback" />
        <span>Share your Feedback</span>
      </div>
      <div className={styles.feedbackSubheader}>
        The team usually replies within a day.
      </div>
      {isSubmitted ? (
        <SubmitMessage closeModal={closeModal} />
      ) : (
        <Fragment>
          {<VoteButtons vote={vote} onVoteChange={handleVoteChange} />}
          {steps[step]}
          <NavigationButtons
            step={step}
            vote={vote}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            onSubmit={handleSubmit}
            isReviewRequired={isReviewRequired}
          />
        </Fragment>
      )}
    </div>
  );
};

export default FeedbackModal;
