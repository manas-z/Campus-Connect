import { useState, useRef, useEffect } from "react";
import Action from "./Action";

const Comment = ({
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      inputRef?.current?.focus();
    }
  }, [editMode]);

  const onEditComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    }
    setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div className="commentContainer">
      <>
        <span
          contentEditable={editMode}
          suppressContentEditableWarning={editMode}
          ref={inputRef}
          style={{ wordWrap: "break-word" }}
        >
          {comment.name}
        </span>

        <div style={{ display: "flex", marginTop: "5px" }}>
          {editMode ? (
            <>
              <Action
                className="reply"
                type="SAVE"
                handleClick={onEditComment}
              />
              <Action
                className="reply"
                type="CANCEL"
                handleClick={() => {
                  if (inputRef.current) inputRef.current.innerText = comment.name;
                  setEditMode(false);
                }}
              />
            </>
          ) : (
            <>
              <Action
                className="reply"
                type="EDIT"
                handleClick={() => setEditMode(true)}
              />
              <Action
                className="reply"
                type="DELETE"
                handleClick={handleDelete}
              />
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default Comment;
