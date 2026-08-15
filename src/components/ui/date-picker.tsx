"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Date Picker
 *
 * O registry do shadcn não publica um item `date-picker`: a documentação oficial
 * o descreve como uma composição de Popover + Calendar + Button. Este arquivo é
 * essa composição, empacotada para uso direto, mantendo a arquitetura shadcn —
 * componentes editáveis no projeto, estilizados por tokens.
 */

export interface DatePickerProps {
  /** Data selecionada (modo controlado). */
  value?: Date;
  /** Data inicial (modo não controlado). */
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Formato date-fns exibido no gatilho. */
  displayFormat?: string;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
}

export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Escolha uma data",
  disabled,
  displayFormat = "dd 'de' MMMM 'de' yyyy",
  id,
  className,
  "aria-invalid": ariaInvalid,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const date = value !== undefined ? value : internal;

  function select(next: Date | undefined) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className={cn(
              "w-64 justify-start gap-2 font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-4" />
        {date ? format(date, displayFormat, { locale: ptBR }) : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={select}
          autoFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  numberOfMonths?: number;
  id?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Escolha um período",
  disabled,
  numberOfMonths = 2,
  id,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<DateRange | undefined>(
    defaultValue,
  );
  const range = value !== undefined ? value : internal;

  function select(next: DateRange | undefined) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    // Só fecha quando o período está completo.
    if (next?.from && next?.to) setOpen(false);
  }

  const label = range?.from
    ? range.to
      ? `${format(range.from, "dd MMM", { locale: ptBR })} – ${format(range.to, "dd MMM yyyy", { locale: ptBR })}`
      : format(range.from, "dd MMM yyyy", { locale: ptBR })
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-72 justify-start gap-2 font-normal",
              !range?.from && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-4" />
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={select}
          numberOfMonths={numberOfMonths}
          autoFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
