import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentSection = props => {
  return (
    <React.Fragment>
      <div>
        {props.comments.map(comment => (
          <Comment
            usercomment={comment.username}
            text={comment.text}
            key={comment.text}
          />
        ))}
      </div>
      <div className="timestamp">{props.timestamp}</div>
      <div className="add-comment">
        <form onSubmit={props.addNewComment}>
          <input
            className="comment-input"
            type="text"
            value={props.text}
            placeholder="Add a comment..."
            onChange={props.commentValueChange}
            name="text"
          />
        </form>
      </div>
    </React.Fragment>
  );
};

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      text: PropTypes.string
    })
  ),
  timestamp: PropTypes.string,
  addNewComment: PropTypes.func,
  text: PropTypes.string
};

export default CommentSection;
