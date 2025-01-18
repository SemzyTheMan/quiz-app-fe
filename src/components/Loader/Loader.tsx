
type LoaderSize = 'small' | 'medium' | 'large';
type LoaderColor = 'blue' | 'red' | 'green' | 'purple';

const Loader = ({ size = 'medium', color = 'blue', text = 'Loading...' }: {
  size?: LoaderSize;
  color?: LoaderColor;
  text?: string;
}) => {
  // Tailwind classes for different sizes
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  // Tailwind classes for different colors
  const colorClasses = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    purple: 'border-purple-500'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          border-4
          border-t-transparent
          rounded-full
          animate-spin
        `}
      />
      {text && (
        <h1 className="my-2 text-blue-500 font-medium">
         {text}
        </h1>
      )}
    </div>
  );
};
 
export default Loader;
