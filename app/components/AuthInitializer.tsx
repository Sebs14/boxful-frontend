'use client';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  // La inicialización de autenticación ahora se maneja automáticamente en el store
  return <>{children}</>;
}
