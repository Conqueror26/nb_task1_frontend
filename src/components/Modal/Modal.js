import React from "react";
import "./Modal.css";
const modal = (props) => {
  return (
    <>
      <div className="modal">
        <header className="modal_header">{props.title}</header>
        <section className="modal_content">{props.children}</section>
        <section className="modal_actions">
          {props.canCancel && (
            <button className="btn" onClick={props.onCancel}>
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button className="btn" onClick={props.onConfirm}>
              Confirm
            </button>
          )}
        </section>
      </div>
    </>
  );
};

export default modal;
