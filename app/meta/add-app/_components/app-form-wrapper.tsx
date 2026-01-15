import { fetchAppData } from '@/app/_components/fetch';
import AppForm from './app-form';

const AppFormWrapper = async () => {
  const { success, token } = await fetchAppData();

  if (!success || !token) return <p>Unable to fetch app data. Please try again later.</p>;

  return <AppForm token={token} />;
};

export default AppFormWrapper;
