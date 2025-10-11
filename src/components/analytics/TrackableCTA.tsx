import { Button, ButtonProps } from "@/components/ui/button";
import { trackCTAClick } from "@/utils/analytics";

interface TrackableCTAProps extends ButtonProps {
  ctaText: string;
  location: string;
}

const TrackableCTA = ({ ctaText, location, children, onClick, ...props }: TrackableCTAProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackCTAClick(ctaText, location);
    onClick?.(e);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children || ctaText}
    </Button>
  );
};

export default TrackableCTA;
