import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface CustomButtonProps extends ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  className,
  onClick,
  type = 'primary',
  ...rest
}) => (
  <Button
    type={type}
    onClick={onClick}
    icon={icon}
    className={` h-14 px-6 py-6 rounded-lg flex justify-start items-center gap-2 ${className}`}
    {...rest}
  >
    <div className="text-center text-base font-bold font-['Manrope'] leading-normal tracking-tight">
      {title}
    </div>
  </Button>
);

export default CustomButton;
