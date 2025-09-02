export type MenuNode = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  to?: string;
  children?: MenuNode[];
};