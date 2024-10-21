import { Button } from '@material-tailwind/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode,
  moreClasses?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function OrangeButton({ children,
  moreClasses = '', isLoading = false, ...rest }: ButtonProps) {
  return (
    // @ts-expect-error - material-tailwind @types/react bug
    <Button
      className={ `w-32 md:w-60 h-6 md:h-12 bg-btn-orange
      self-center my-3 md:rounded-md font-semibold text-xs 
      md:text-base flex items-center justify-center ${moreClasses}` }
      loading={ isLoading }
      { ...rest }
    >
      {children}
    </Button>
  );
}
