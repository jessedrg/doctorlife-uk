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

type DayState = { enabled: boolean; start: string; end: string }

function minutesToTime(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

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
  // Una ventana por día (toma la primera regla del día si existe).
  const initialDays: Record<number, DayState> = {}
  for (const { dow } of DAYS) {
    const rule = initialRules.find((r) => r.dayOfWeek === dow)
    initialDays[dow] = rule
      ? { enabled: true, start: minutesToTime(rule.startMinute), end: minutesToTime(rule.endMinute) }
      : { enabled: false, start: "09:00", end: "17:00" }
  }

  const [days, setDays] = useState<Record<number, DayState>>(initialDays)
  const [slotMinutes, setSlotMinutes] = useState(initialSlotMinutes)
  const [timezone, setTimezone] = useState(initialTimezone)
  const [exceptions, setExceptions] = useState<string[]>(initialExceptions)
  const [newDate, setNewDate] = useState("")
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  function setDay(dow: number, patch: Partial<DayState>) {
    setDays((d) => ({ ...d, [dow]: { ...d[dow], ...patch } }))
    setSaved(false)
  }

  function handleSave() {
    const rules: WeeklyRule[] = DAYS.filter(({ dow }) => days[dow].enabled).map(({ dow }) => ({
      dayOfWeek: dow,
      startMinute: timeToMinutes(days[dow].start),
      endMinute: timeToMinutes(days[dow].end),
    }))
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
                className="flex flex-wrap items-center gap-3 rounded-xl border border-ink/10 bg-warm px-4 py-3"
              >
                <label className="flex w-32 items-center gap-2 text-sm font-medium text-ink">
                  <input
                    type="checkbox"
                    checked={d.enabled}
                    onChange={(e) => setDay(dow, { enabled: e.target.checked })}
                    className="h-4 w-4 accent-olive"
                  />
                  {label}
                </label>
                {d.enabled ? (
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <input
                      type="time"
                      value={d.start}
                      onChange={(e) => setDay(dow, { start: e.target.value })}
                      className="rounded-lg border border-ink/15 bg-paper px-2 py-1.5 text-ink"
                    />
                    <span>a</span>
                    <input
                      type="time"
                      value={d.end}
                      onChange={(e) => setDay(dow, { end: e.target.value })}
                      className="rounded-lg border border-ink/15 bg-paper px-2 py-1.5 text-ink"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-ink-mute">No disponible</span>
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
