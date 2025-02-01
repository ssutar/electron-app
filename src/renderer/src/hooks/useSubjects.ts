import { ISubject } from '@interfaces/models';
import { useAuth } from '@/components/AuthContext';
import { useState, useEffect } from 'react';

export const useSubjects = () => {
  const { authUser } = useAuth();
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    if (authUser?.id) {
      window.api.getAllSubjects(authUser.id).then(setSubjects);
    }
  }, []);

  return { subjects };
};
