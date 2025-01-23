import Breadcrumb from '@renderer/components/Breadcrumbs/Breadcrumb';
import { UpdateForm } from '@renderer/components/Updates/UpdateForm';
import React from 'react';

export const AddUpdatesPage = () => {
  return (
    <>
      <Breadcrumb title="Add updates" />
      <UpdateForm onSuccess={() => {}} />
    </>
  );
};
