
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <div className={cn("text-center mb-8", className)}>
      <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">{title}</h1>
      {description && <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">{description}</p>}
    </div>
  );
};

export default PageHeader;
