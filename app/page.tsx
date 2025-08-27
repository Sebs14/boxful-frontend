import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen font-mona-sans'>
      <RegisterForm />
      {/* <LoginForm /> */}
      <div className='flex flex-col w-1/2 h-screen items-center sm:items-start bg-[#EDEDED]' />
    </div>
  );
}
