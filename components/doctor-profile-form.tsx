"use client"

import { useRef, useState, useTransition } from "react"
import { Camera, Loader2 } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { updateDoctorProfile, uploadDoctorAvatar } from "@/app/actions/doctor"

type Profile = {
  fullName: string
  specialty: string | null
  licenseNumber: string | null
  bio: string | null
  acceptingPatients: boolean
  image: string | null
}

export function DoctorProfileForm({ profile }: { profile: Profile }) {
  const [image, setImage] = useState(profile.image)
  const [fullName, setFullName] = useState(profile.fullName)
  const [specialty, setSpecialty] = useState(profile.specialty ?? "")
  const [licenseNumber, setLicenseNumber] = useState(profile.licenseNumber ?? "")
  const [bio, setBio] = useState(profile.bio ?? "")
  const [accepting, setAccepting] = useState(profile.acceptingPatients)

  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setMsg(null)
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const res = await uploadDoctorAvatar(fd)
    setUploading(false)
    if (res.ok) {
      setImage(res.url)
      setMsg({ ok: true, text: "Foto actualizada." })
    } else {
      setMsg({ ok: false, text: res.error })
    }
    if (fileRef.current) fileRef.current.value = ""
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    startTransition(async () => {
      const res = await updateDoctorProfile({
        fullName,
        specialty,
        licenseNumber,
        bio,
        acceptingPatients: accepting,
      })
      setMsg(
        res.ok
          ? { ok: true, text: "Perfil guardado." }
          : { ok: false, text: res.error ?? "No se pudo guardar." },
      )
    })
  }

  const inputCls =
    "rounded-[13px] border border-ink/15 bg-warm px-[16px] py-3.5 text-[15.5px] text-ink outline-none transition-colors focus:border-amber"
  const labelCls = "flex flex-col gap-1.5 text-[13px] font-medium text-ink-soft"

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[560px] flex-col gap-5">
      {/* Foto */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <UserAvatar name={fullName || "Médico"} image={image} size={76} />
          {uploading && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/40">
              <Loader2 className="size-5 animate-spin text-paper" aria-hidden />
            </span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-warm px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:bg-ink/5 disabled:opacity-60"
          >
            <Camera className="size-4" aria-hidden />
            {image ? "Cambiar foto" : "Subir foto"}
          </button>
          <p className="mt-1.5 text-[12px] text-ink-mute">JPG o PNG, hasta 5 MB.</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>

      <label className={labelCls}>
        Nombre completo
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className={inputCls}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>
          Especialidad
          <input
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Medicina general"
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Nº de colegiado
          <input
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="000000000"
            className={inputCls}
          />
        </label>
      </div>

      <label className={labelCls}>
        Sobre ti
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          placeholder="Una breve presentación que verán tus pacientes."
          className={`${inputCls} resize-none`}
        />
      </label>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[13px] border border-ink/15 bg-warm px-[16px] py-3.5">
        <span>
          <span className="block text-[14.5px] font-medium text-ink">Acepto nuevos pacientes</span>
          <span className="block text-[12.5px] text-ink-soft">
            Controla si apareces disponible para nuevas reservas.
          </span>
        </span>
        <input
          type="checkbox"
          checked={accepting}
          onChange={(e) => setAccepting(e.target.checked)}
          className="size-5 shrink-0 accent-ink"
        />
      </label>

      {msg && (
        <p className={`text-[13.5px] ${msg.ok ? "text-olive" : "text-clay"}`}>{msg.text}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-ink py-3.5 text-[15px] font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8 sm:self-start"
      >
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {pending ? "Guardando…" : "Guardar perfil"}
      </button>
    </form>
  )
}
