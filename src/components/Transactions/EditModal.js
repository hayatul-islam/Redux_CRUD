import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { changeTransaction } from "../../features/transactions/transactionsSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "470px",
  },
};

export default function EditModal({ modalIsOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.transactions);

  let subtitle;
  function afterOpenModal() {
    subtitle.style.background = "red";
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const { id, name, amount, type } = editing || {};
    if (id) {
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName("");
    setAmount("");
    setType("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name,
          amount,
          type,
        },
      })
    );
    reset();
    setIsOpen(false);
  };
  const cancelEditMode = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                required
                type="radio"
                value="income"
                name="type"
                checked={type === "income"}
                onChange={(e) => setType("income")}
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                required
                type="radio"
                value="expense"
                name="type"
                checked={type === "expense"}
                placeholder="Expense"
                onChange={(e) => setType("expense")}
              />
              <label>Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="enter amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Update Transaction
          </button>
          {modalIsOpen && (
            <button onClick={cancelEditMode} className="btn cancel_edit">
              Cancel Edit
            </button>
          )}
        </form>
      </Modal>
    </div>
  );
}
