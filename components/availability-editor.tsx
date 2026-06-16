"use client"

import { useState, useTransition } from "react"
import {
  saveWeeklyRules,
  updateScheduleSettings,
  addBlockedDate,
  removeBlockedDate,
  previewMySlots,
} from "@/app/actions/availability"
import type { Slot, WeeklyRule } from "@/lib/scheduling"

const DAYS = [
  { dow: 1, label: "Lunes" },
  { dow: 2, label: "Martes" },
  { dow: 3, label: "Miércoles" },
  { dow: 4, label: "Jueves" },
  { dow: 5, label: "Viernes" },
  { dow: 6, label: "Sábado" },
  { dow: 0, label: "Domingo" },
]

const TIMEZONES = [
  "Europe/Madrid",
  "Atlantic/Canary",
  "Europe/Lisbon",
  "Europe/London",
  "America/Mexico_City",
  "America/Argentina/Buenos_Aires",
]

type Window = { start: string; end: string }
type DayState = { enabled: boolean; windows: Window[] }

function minutesToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

const DEFAULT_WINDOW: Window = { start: "09:00", end: "17:00" }

export function AvailabilityEditor({
  initialRules,
  initialExceptions,
  initialSlotMinutes,
  initialTimezone,
}: {
  initialRules: WeeklyRule[]
  initialExceptions: string[]
  initialSlotMinutes: number
  initialTimezone: string
}) {
  // Varias franjas por día: agrupamos todas las reglas del mismo día.
  const initialDays: Record<number, DayState> = {}
  for (const { dow } of DAYS) {
    const dayRules = initialRules
      .filter((r) => r.dayOfWeek === dow)
      .sort((a, b) => a.startMinute - b.startMinute)
    initialDays[dow] = dayRules.length
      ? {
          enabled: true,
          windows: dayRules.map((r) => ({
            start: minutesToTime(r.startMinute),
            end: minutesToTime(r.endMinute),
          })),
        }
      : { enabled: false, windows: [{ ...DEFAULT_WINDOW }] }
  }

  const [days, setDays] = useState<Record<number, DayState>>(initialDays)
  const [slotMinutes, setSlotMinutes] = useState(initialSlotMinutes)
  const [timezone, setTimezone] = useState(initialTimezone)
  const [exceptions, setExceptions] = useState<string[]>(initialExceptions)
  const [newDate, setNewDate] = useState("")
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  function toggleDay(dow: number, enabled: boolean) {
    setDays((d) => ({
      ...d,
      [dow]: {
        enabled,
        windows: d[dow].windows.length ? d[dow].windows : [{ ...DEFAULT_WINDOW }],
      },
    }))
    setSaved(false)
  }

  function setWindow(dow: number, index: number, patch: Partial<Window>) {
    setDays((d) => {
      const windows = d[dow].windows.map((w, i) => (i === index ? { ...w, ...patch } : w))
      return { ...d, [dow]: { ...d[dow], windows } }
    })
    setSaved(false)
  }

  function addWindow(dow: number) {
    setDays((d) => {
      // La nueva franja empieza una hora después del fin de la última.
      const last = d[dow].windows[d[dow].windows.length - 1]
      const startMin = last ? Math.min(timeToMinutes(last.end) + 60, 22 * 60) : 9 * 60
      const next: Window = {
        start: minutesToTime(startMin),
        end: minutesToTime(Math.min(startMin + 60, 23 * 60 + 59)),
      }
      return { ...d, [dow]: { ...d[dow], windows: [...d[dow].windows, next] } }
    })
    setSaved(false)
  }

  function removeWindow(dow: number, index: number) {
    setDays((d) => {
      const windows = d[dow].windows.filter((_, i) => i !== index)
      return {
        ...d,
        [dow]: windows.length
          ? { ...d[dow], windows }
          : { enabled: false, windows: [{ ...DEFAULT_WINDOW }] },
      }
    })
    setSaved(false)
  }

  function handleSave() {
    const rules: WeeklyRule[] = DAYS.filter(({ dow }) => days[dow].enabled).flatMap(({ dow }) =>
      days[dow].windows.map((w) => ({
        dayOfWeek: dow,
        startMinute: timeToMinutes(w.start),
        endMinute: timeToMinutes(w.end),
      })),
    )
    startTransition(async () => {
      await updateScheduleSettings({ slotMinutes, timezone })
      await saveWeeklyRules(rules)
      setSaved(true)
      setSlots(null)
    })
  }

  function handleAddDate() {
    if (!newDate) return
    startTransition(async () => {
      await addBlockedDate(newDate)
      setExceptions((e) => [...e, newDate].sort())
      setNewDate("")
    })
  }

  function handleRemoveDate(date: string) {
    startTransition(async () => {
      await removeBlockedDate(date)
      setExceptions((e) => e.filter((d) => d !== date))
    })
  }

  function handlePreview() {
    startTransition(async () => {
      const result = await previewMySlots(14)
      setSlots(result)
    })
  }

  const slotsByDate = (slots ?? []).reduce<Record<string, Slot[]>>((acc, s) => {
    ;(acc[s.date] ??= []).push(s)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-8">
      {/* Ajustes generales */}
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <h2 className="mb-4 text-lg font-medium text-ink">Ajustes</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            Duración de cita
            <select
              value={slotMinutes}
              onChange={(e) => {
                setSlotMinutes(Number(e.target.value))
                setSaved(false)
              }}
              className="rounded-lg border border-ink/15 bg-warm px-3 py-2 text-ink"
            >
              {[15, 20, 30, 45, 60].map((m) => (
                <option key={m} value={m}>
                  {m} minutos
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            Zona horaria
            <select
              value={timezone}
              onChange={(e) => {
                setTimezone(e.target.value)
                setSaved(false)
              }}
              className="rounded-lg border border-ink/15 bg-warm px-3 py-2 text-ink"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* Horario semanal */}
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <h2 className="mb-4 text-lg font-medium text-ink">Horario semanal</h2>
        <div className="flex flex-col gap-3">
          {DAYS.map(({ dow, label }) => {
            const d = days[dow]
            return (
              <div
                key={dow}
                className="flex flex-col gap-3 rounded-xl border border-ink/10 bg-warm px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <label className="flex w-32 shrink-0 items-center gap-2 pt-1.5 text-sm font-medium text-ink">
                  <input
                    type="checkbox"
                    checked={d.enabled}
                    onChange={(e) => toggleDay(dow, e.target.checked)}
                    className="h-4 w-4 accent-olive"
                  />
                  {label}
                </label>
                {d.enabled ? (
                  <div className="flex flex-1 flex-col gap-2">
                    {d.windows.map((w, i) => (
                      <div key={i} className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                        <input
                          type="time"
                          value={w.start}
                          onChange={(e) => setWindow(dow, i, { start: e.target.value })}
                          className="rounded-lg border border-ink/15 bg-paper px-2 py-1.5 text-ink"
                        />
                        <span>a</span>
                        <input
                          type="time"
                          value={w.end}
                          onChange={(e) => setWindow(dow, i, { end: e.target.value })}
                          className="rounded-lg border border-ink/15 bg-paper px-2 py-1.5 text-ink"
                        />
                        <button
                          type="button"
                          onClick={() => removeWindow(dow, i)}
                          aria-label={`Quitar franja ${i + 1} de ${label}`}
                          className="rounded-lg border border-ink/15 px-2 py-1.5 text-ink-soft hover:bg-ink/[.04] hover:text-clay"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addWindow(dow)}
                      className="self-start text-sm font-medium text-olive hover:underline"
                    >
                      + Añadir franja
                    </button>
                  </div>
                ) : (
                  <span className="flex-1 pt-1.5 text-sm text-ink-mute">No disponible</span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Días bloqueados */}
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <h2 className="mb-1 text-lg font-medium text-ink">Días bloqueados</h2>
        <p className="mb-4 text-sm text-ink-soft">Vacaciones o festivos en los que no atiendes.</p>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded-lg border border-ink/15 bg-warm px-3 py-2 text-sm text-ink"
          />
          <button
            type="button"
            onClick={handleAddDate}
            disabled={pending || !newDate}
            className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-50"
          >
            Bloquear
          </button>
        </div>
        {exceptions.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {exceptions.map((date) => (
              <li
                key={date}
                className="flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-sm text-ink"
              >
                {date}
                <button
                  type="button"
                  onClick={() => handleRemoveDate(date)}
                  aria-label={`Quitar ${date}`}
                  className="text-clay hover:text-ink"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Acciones */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          className="rounded-xl bg-olive px-6 py-3 text-sm font-semibold text-paper disabled:opacity-50"
        >
          {pending ? "Guardando…" : "Guardar disponibilidad"}
        </button>
        <button
          type="button"
          onClick={handlePreview}
          disabled={pending}
          className="rounded-xl border border-ink/15 px-6 py-3 text-sm font-medium text-ink disabled:opacity-50"
        >
          Previsualizar huecos
        </button>
        {saved && <span className="text-sm text-olive">Guardado ✓</span>}
      </div>

      {/* Vista previa */}
      {slots && (
        <section className="rounded-2xl border border-ink/10 bg-paper p-6">
          <h2 className="mb-4 text-lg font-medium text-ink">
            Próximos huecos ({slots.length})
          </h2>
          {slots.length === 0 ? (
            <p className="text-sm text-ink-soft">
              No hay huecos en los próximos 14 días. Revisa tu horario y guárdalo.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {Object.entries(slotsByDate).map(([date, daySlots]) => (
                <div key={date}>
                  <p className="mb-2 text-sm font-medium text-ink">{date}</p>
                  <div className="flex flex-wrap gap-2">
                    {daySlots.map((s) => (
                      <span
                        key={s.startUtc}
                        className="rounded-lg border border-sage/40 bg-sage/15 px-2.5 py-1 text-sm text-ink"
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
