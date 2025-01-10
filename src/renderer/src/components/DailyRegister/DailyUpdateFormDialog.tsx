import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkDailyUpdateForm } from './LinkDailyUpdateForm';

export const DailyUpdateFormDialog = ({ date = new Date() }: { date?: Date }) => {
  const [isAddUpdateFormOpen, setIsAddUpdateFormOpen] = useState(false);
  const { t } = useTranslation();

  const openLinkDailyUpdateForm = () => {
    setIsAddUpdateFormOpen(true);
  };

  const closeLinkDailyUpdateForm = () => {
    setIsAddUpdateFormOpen(false);
  };

  return (
    <>
      <dialog open={isAddUpdateFormOpen}>
        <article>
          <header style={{ padding: '1.5rem 2rem' }}>
            <button aria-label="Close" rel="prev" onClick={closeLinkDailyUpdateForm}></button>
            <h5>{t('linkDailyUpdateFormDialog.title')}</h5>
          </header>
          <LinkDailyUpdateForm
            onSuccess={closeLinkDailyUpdateForm}
            date={date.toISOString().slice(0, 10)}
          />
        </article>
      </dialog>
      <button id="add-update-button" onClick={openLinkDailyUpdateForm}>
        {t('linkDailyUpdateFormDialog.add')}
      </button>
    </>
  );
};
