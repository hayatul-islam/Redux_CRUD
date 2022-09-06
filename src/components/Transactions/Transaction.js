import React from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  editActive,
  removeTransaction,
} from "../../features/transactions/transactionsSlice";
import EditModal from "./EditModal";

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const { name, type, amount, id } = transaction || {};
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const match = useMatch("/");
  // const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(editActive(transaction));
    if (!match) {
      setIsOpen(true);
    }
  };
  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {amount}</p>
          <button onClick={handleEdit} className="link">
            <img alt="Edit" className="icon" src={editImage} />
          </button>
          <button onClick={handleDelete} className="link">
            <img alt="Delete" className="icon" src={deleteImage} />
          </button>
        </div>
      </li>
      {modalIsOpen && (
        <EditModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
}
