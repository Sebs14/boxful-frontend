import LoginForm from './components/LoginForm';

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen font-mona-sans'>
      <LoginForm />
      <div className='flex flex-col w-1/2 h-screen items-center sm:items-start bg-[#EDEDED]' />
    </div>
  );
}
