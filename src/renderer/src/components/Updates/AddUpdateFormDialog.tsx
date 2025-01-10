import React, { useState } from 'react';
import { UpdateForm } from './UpdateForm';
import { useTranslation } from 'react-i18next';

export const AddUpdateFormDialog = () => {
  const [isAddUpdateFormOpen, setIsAddUpdateFormOpen] = useState(false);
  const { t } = useTranslation();

  const openAddUpdateFrom = () => {
    setIsAddUpdateFormOpen(true);
  };

  const closeAddUpdateForm = () => {
    setIsAddUpdateFormOpen(false);
  };

  return (
    <>
      <dialog open={isAddUpdateFormOpen}>
        <article>
          <header style={{ padding: '1.5rem 2rem' }}>
            <button aria-label="Close" rel="prev" onClick={closeAddUpdateForm}></button>
            <h5>{t('addUpdateFormDialog.title')}</h5>
          </header>
          <UpdateForm onSuccess={closeAddUpdateForm} />
        </article>
      </dialog>
      <button id="add-update-button" onClick={openAddUpdateFrom}>
        {t('addUpdateFormDialog.add')}
      </button>
    </>
  );
};
