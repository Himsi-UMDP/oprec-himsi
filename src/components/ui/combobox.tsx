import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type ComboboxItem = { value: string; label: string };

export function Combobox({
  value,
  onValueChange,
  items,
  placeholder = "Pilih opsi",
  emptyText = "Tidak ada data",
  disabled,
}: {
  value: string;
  onValueChange: (value: string) => void;
  items: ComboboxItem[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(
    () => items.find((i) => i.value === value),
    [items, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between rounded-xl h-11 px-4 font-semibold",
            "bg-white/70 hover:bg-white/70",
            "text-foreground border border-black/10 shadow-sm",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? selected.label : placeholder}
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className={cn(
          "p-2",
          "w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)]"
        )}
      >
        <div className="max-h-64 overflow-auto w-full">
          {items.length === 0 ? (
            <div className="px-3 py-3 text-sm font-semibold text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            items.map((item) => {
              const active = item.value === value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onValueChange(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-left text-sm font-semibold rounded-md",
                    "hover:bg-muted focus:outline-none",
                    active && "bg-muted"
                  )}
                >
                  <span>{item.label}</span>
                  {active ? <Check className="h-4 w-4 opacity-70" /> : null}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}