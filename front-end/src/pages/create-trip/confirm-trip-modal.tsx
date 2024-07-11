import { Mail, User, X } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "../../components/button"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { ptBR } from "date-fns/locale"

interface ConfirmTripModalProps{
    closeConfirmTripModal: () => void
    createTrip: (e: FormEvent<HTMLFormElement>) => void
    setOwnerName:(name: string)=> void
    setOwnerEmail:(email: string)=> void
}

interface Trip{
  id: string
  destination: string,
  starts_at: string,
  ends_at: string,
  is_confirmed: boolean,
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerEmail,
    setOwnerName,
} : ConfirmTripModalProps){

  const {tripId} = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
      api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip ? format(trip.starts_at, "d' de 'LLL", {locale:ptBR}).concat(" até ").concat(format(trip.ends_at, "d' de ' LLL ", {locale:ptBR}))
: null

    return(
        
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg bg-zinc-900 space-y-5">

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
              <button type="button" onClick={closeConfirmTripModal}>
                <X className="size-5 text-zinc-400"/>
              </button>
            </div>
            <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">{trip?.destination}</span> nas datas de <span className="text-zinc-100 font-semibold">{displayedDate}</span> preencha seus dados abaixo:</p>
          </div>

          <form onSubmit={createTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5"/>
              <input 
              onChange={e => setOwnerName(e.target.value)}
              type="name" 
              name="text" 
              placeholder="Seu nome completo" 
              className="bg-transparent txt-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <div className="py-2.5 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5"/>
              <input 
              onChange={e => setOwnerEmail(e.target.value)}
              type="email" 
              name="email" 
              placeholder="Seu email pessoal" 
              className="bg-transparent txt-lg placeholder-zinc-400 outline-none flex-1" />
            </div>

            <Button type="submit" variant="primary" size="full">
              Confirmar criação da viagem
            </Button>
          </form>

        </div>
      </div>
      
    )
}