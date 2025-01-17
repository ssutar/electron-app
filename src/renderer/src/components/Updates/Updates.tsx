import React, { useEffect, useState } from 'react';
import { AddUpdateFormDialog } from './AddUpdateFormDialog';
import { UpdatesTable } from './UpdatesTable';
import { useTranslation } from 'react-i18next';
import { IUpdate } from '@interfaces/models';
import { useAuth } from '../AuthContext';

export const Updates = () => {
  const [updates, setUpdates] = useState<IUpdate[]>([]);
  const { authUser } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (authUser?.id) {
      window.api.getAllUpdates(authUser.id).then(setUpdates);
    }
  }, []);
  return (
    <>
      <header
        className="flex"
        style={{ justifyContent: 'space-between', paddingBottom: 'var(--pico-spacing)' }}
      >
        <h2>{t('updatesPage.title')}</h2>
        {/* <button className="outline" onClick={handleRegisterPrint} id="register-print-button">
          {t('homePage.print')}
        </button> */}
      </header>
      <section>
        <UpdatesTable updates={updates} />
      </section>
      <AddUpdateFormDialog />
    </>
  );
};
