import DashboardLayout from '../components/Dashboard/DashboardLayout';
import CreateOrderContent from '../components/Dashboard/CreateOrderContent';

const DashboardPage = () => {
  return (
    <DashboardLayout title='Crear orden'>
      <CreateOrderContent />
    </DashboardLayout>
  );
};

export default DashboardPage;
