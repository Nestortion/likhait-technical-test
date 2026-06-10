import { FC, useState } from "react";
import { Button, Modal } from "../vibes"
import { ExpenseForm } from "./ExpenseForm"
import { Category, ExpenseFormData } from "../types";
import { createExpense } from "../services/api";

type ExpenseModalProps = {
  fetchExpenses?: () => Promise<void>
  categories?: Category[]
}

const ExpenseModal: FC<ExpenseModalProps> = ({
  fetchExpenses,
  categories
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      await createExpense(data);
      setIsModalOpen(false);
      fetchExpenses && fetchExpenses();
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  };
  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Expense
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
      >
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setIsModalOpen(false)}
          categories={categories}
        />
      </Modal>
    </>
  )
}

export default ExpenseModal
