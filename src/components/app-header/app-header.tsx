import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  // Получаем данные пользователя из store
  const user = useSelector(selectUser);

  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />;
};
