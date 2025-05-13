import Link from 'next/link';
import GradientButton from '@/components/GradientButton';

interface MessagePageProps {
  code?: string;
  message?: string;
  actionURL?: string;
  actionMessage?: string;
}
export default function MessagePage({
  code = '404',
  message = 'Oops! This link seems to be broken.',
  actionURL = "/",
  actionMessage = 'Return Home',
}: MessagePageProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold gradient-text mb-4">{code}</h1>
        <p className="text-xl mb-8 text-gray-300">{message}</p>
        <Link href={actionURL} passHref>
          <GradientButton variant="primary" className="mx-auto">
            {actionMessage}
          </GradientButton>
        </Link>
      </div>
    </div>
  );
}
