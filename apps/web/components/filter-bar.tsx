import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function FilterBar({
  orderByFilterValue,
  unreadReadFilterValue,
  onOrderByFilterChange,
  onUnreadReadFilterChange,
}: {
  orderByFilterValue: string;
  unreadReadFilterValue: string;
  onOrderByFilterChange: (value: string) => void;
  onUnreadReadFilterChange: (value: string) => void;
}) {
  return (
    <>
      <Select value={orderByFilterValue} onValueChange={onOrderByFilterChange}>
        <SelectTrigger className="w-[180px] mb-8 self-end">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Älteste zuerst</SelectItem>
          <SelectItem value="desc">Neueste zuerst</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={unreadReadFilterValue}
        onValueChange={onUnreadReadFilterChange}>
        <SelectTrigger className="w-[180px] mb-8 self-end">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unread">Ungelesen</SelectItem>
          <SelectItem value="read">Gelesen</SelectItem>
        </SelectContent>
      </Select>{' '}
    </>
  );
}
