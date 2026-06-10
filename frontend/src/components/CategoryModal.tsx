import { FC, useState } from "react";
import { Button, Modal } from "../vibes"
import { CategoryFormData } from "../types";
import { createCategory } from "../services/api";
import { CategoryForm } from "./CategoryForm";

type CategoryModalProps = {
  fetchCategories?: () => Promise<void>
}

const CategoryModal: FC<CategoryModalProps> = ({
  fetchCategories
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddCategory = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      setIsModalOpen(false);
      fetchCategories && fetchCategories();
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  };
  return (
    <>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Category
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  )
}

export default CategoryModal
