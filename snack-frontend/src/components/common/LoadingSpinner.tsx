interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClass[size]} animate-spin rounded-full border-2 border-orange-200 border-t-orange-500`}
      />
    </div>
  );
}
