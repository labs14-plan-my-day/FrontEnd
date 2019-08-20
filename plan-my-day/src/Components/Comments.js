import React from "react";
import PropTypes from "prop-types";

const Comment = props => {
  return (
    <div className="comment-div">
      <div className="comment-container">
        <span className="user-comment">{props.usercomment} </span>
        <span className="text">{props.text}</span>
      </div>
    </div>
  );
};

Comment.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
};

export default Comment;
