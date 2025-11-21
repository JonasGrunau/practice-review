import { LoginCard } from '@/components/login-card';

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm pb-32">
        <LoginCard />
      </div>
    </div>
  );
}
