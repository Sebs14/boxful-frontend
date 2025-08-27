import AuthContainer from './components/AuthContainer';

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen font-mona-sans'>
      <AuthContainer />
      <div className='flex flex-col w-1/2 h-screen items-center sm:items-start bg-[#EDEDED]' />
    </div>
  );
}
