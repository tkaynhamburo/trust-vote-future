interface BeeIconProps {
  className?: string;
}

export const BeeIcon = ({ className = "w-6 h-6" }: BeeIconProps) => {
  return (
    <img 
      src="/lovable-uploads/a692f9ea-d94a-4fe5-bf41-8d2d93ab65d8.png" 
      alt="Visionary Bee Logo" 
      className={className}
    />
  );
};