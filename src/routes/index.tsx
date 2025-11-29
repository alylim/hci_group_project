import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AlarmClock, X } from 'lucide-react'
import { Window } from '@/components/window'
import { Button, Label, Separator, Switch } from '@/components/ui'
import { cn } from '@/lib/utils'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/')({
  component: App,
})

type DeckStatusType = {
  title: string
  status: 'good' | 'due' | 'overdue'
  new: number
  learn: number
  due: number
}

type DeckSettingsType = {
  isReminderEnabled: boolean
  isVacationMode: boolean
  studyDeadline?: string
  reminderDaysFrequency?: number
}

type DeckType = {
  settings: DeckSettingsType
} & DeckStatusType

const initDecks: Array<DeckType> = [
  {
    title: 'General Trivia',
    status: 'good',
    new: 10,
    learn: 0,
    due: 0,
    settings: {
      isReminderEnabled: false,
      isVacationMode: false,
      studyDeadline: '',
      reminderDaysFrequency: 0,
    },
  },
  {
    title: 'CS6250 - Human-Computer Interaction',
    status: 'due',
    new: 0,
    learn: 30,
    due: 40,
    settings: {
      isReminderEnabled: false,
      isVacationMode: false,
      studyDeadline: '',
      reminderDaysFrequency: 0,
    },
  },
]

const statusColorMapper = {
  good: 'text-green-500',
  due: 'text-orange-500',
  overdue: 'text-red-500',
}

function App() {
  const [deckData, setDeckData] = useState<Array<DeckType>>(initDecks)

  const [selectedDeckIdx, setSelectedDeckIdx] = useState<number | null>(null)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [vacationEnabled, setVacationEnabled] = useState(false)
  const [reminderFrequency, setReminderFrequency] = useState('1')
  const [customDays, setCustomDays] = useState('')

  function handleAlarmClick(idx: number) {
    setSelectedDeckIdx(idx)
  }

  function handleSettingUpdate(
    setting: keyof DeckSettingsType,
    value: DeckSettingsType[keyof DeckSettingsType],
  ) {
    if (selectedDeckIdx === null) return
    const currDeck = deckData[selectedDeckIdx]
    setDeckData((prevDecks) =>
      prevDecks.map((deck) =>
        deck.title === currDeck.title
          ? {
              ...deck,
              settings: {
                ...deck.settings,
                [setting]: value,
              },
            }
          : deck,
      ),
    )
  }

  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div className="border rounded-md p-4">
            <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] font-bold text-sm py-2">
              <div>Decks</div>
              <div className="text-center">Status</div>
              <div className="text-center">New</div>
              <div className="text-center">Learn</div>
              <div className="text-center">Due</div>
            </div>
            <Separator orientation="horizontal" />

            <div className="max-h-[250px] overflow-y-scroll">
              {deckData.map((deck, idx) => (
                <div
                  key={`deck-${idx}`}
                  className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2"
                >
                  {idx === 0 && <Link to="/review">{deck.title}</Link>}
                  {idx !== 0 && <div>{deck.title}</div>}

                  <div className="flex items-center justify-center">
                    <AlarmClock
                      className={cn(
                        'cursor-pointer hover:opacity-70',
                        statusColorMapper[deck.status],
                      )}
                      onClick={() => handleAlarmClick(idx)}
                    />
                  </div>
                  <div className="text-center text-blue-500">{deck.new}</div>
                  <div className="text-center text-green-500">{deck.learn}</div>
                  <div className="text-center text-red-500">{deck.due}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder setting options */}
          {selectedDeckIdx !== null && (
            <div className="mt-4 border rounded-md p-6 bg-white shadow-lg relative">
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-sm mb-4">
                  Reminder Settings - {deckData[selectedDeckIdx].title}
                </h3>

                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSelectedDeckIdx(null)}
                  className="pb-4"
                >
                  <X size={20} className="text-gray-500" />
                </Button>
              </div>

              <Separator orientation="horizontal" />

              <div className="space-y-2">
                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="reminder-toggle" className="text-sm">
                    Enable study reminder
                  </Label>
                  <Switch
                    id="reminder-toggle"
                    onCheckedChange={(value) =>
                      handleSettingUpdate('isReminderEnabled', value)
                    }
                  />

                  {/* <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {reminderEnabled ? 'On' : 'Off'}
                    </span>
                    <input
                      id="reminder-toggle"
                      type="checkbox"
                      checked={reminderEnabled}
                      onChange={(e) => setReminderEnabled(e.target.checked)}
                      className="w-10 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-green-500
                    before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform before:shadow-md
                    checked:before:translate-x-4"
                    />
                  </div> */}
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="vacation-toggle" className="text-sm">
                    Enable vacation
                  </Label>
                  <Switch
                    id="vacation-toggle"
                    onCheckedChange={(value) =>
                      handleSettingUpdate('isVacationMode', value)
                    }
                  />
                  {/* <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {vacationEnabled ? 'On' : 'Off'}
                    </span>
                    <input
                      id="vacation-toggle"
                      type="checkbox"
                      checked={vacationEnabled}
                      onChange={(e) => setVacationEnabled(e.target.checked)}
                      className="w-10 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-green-500
                    before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform before:shadow-md
                    checked:before:translate-x-4"
                    />
                  </div> */}
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="deadline" className="text-sm">
                    Set exam or study deadline
                  </Label>
                  <DatePicker
                    id={deadline}
                    value={
                      deckData[selectedDeckIdx].settings.studyDeadline
                        ? new Date(
                            deckData[selectedDeckIdx].settings.studyDeadline,
                          )
                        : undefined
                    }
                    onChange={(date) =>
                      handleSettingUpdate(
                        'studyDeadline',
                        date ? date.toISOString() : '',
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="frequency" className="text-sm">
                    Set reminder frequency
                  </Label>
                  <div className="flex items-center gap-2">
                    <Select
                      value={deckData[
                        selectedDeckIdx
                      ].settings.reminderDaysFrequency?.toString()}
                      onValueChange={(value: string) =>
                        handleSettingUpdate(
                          'reminderDaysFrequency',
                          Number(value),
                        )
                      }
                      // className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectTrigger id="frequency" className="w-40">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Daily</SelectItem>
                        <SelectItem value="2">Every 2 days</SelectItem>
                        <SelectItem value="3">Every 3 days</SelectItem>
                        <SelectItem value="5">Every 5 days</SelectItem>
                        <SelectItem value="7">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    {reminderFrequency === 'custom' && (
                      <Input
                        type="number"
                        min={1}
                        placeholder="Days"
                        value={customDays}
                        onChange={(e) => {
                          const val = e.target.value
                          setCustomDays(val)

                          const num = Number(val)
                          if (!Number.isNaN(num) && num > 0) {
                            // Update DeckSettings.reminderDaysFrequency with a proper number
                            handleSettingUpdate('reminderDaysFrequency', num)
                          }
                        }}
                        className="w-20"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Window>
      </div>
    </div>
  )
}
