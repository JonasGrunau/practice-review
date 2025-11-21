import { LoaderIcon } from 'lucide-react';

export default function LoadingSpinner({}: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Laden..."
      className="size-4 animate-spin"
    />
  );
}
