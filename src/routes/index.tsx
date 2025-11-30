import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AlarmClock, BookOpen, X } from 'lucide-react'
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
  isCustomFrequency?: boolean
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
      reminderDaysFrequency: 1,
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
      reminderDaysFrequency: 1,
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

  function handleSettingUpdate(
    setting: keyof DeckSettingsType,
    value: DeckSettingsType[keyof DeckSettingsType],
  ) {
    if (selectedDeckIdx === null) return

    setDeckData((prevDecks) =>
      prevDecks.map((deck, idx) =>
        idx === selectedDeckIdx
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

  const selectedDeck =
    selectedDeckIdx !== null ? deckData[selectedDeckIdx] : null

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
                  {idx === 0 ? (
                    <Link
                      to="/review"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2"
                    >
                      {deck.title}
                      <span>
                        <BookOpen size={16} />
                      </span>
                    </Link>
                  ) : (
                    <div>{deck.title}</div>
                  )}

                  <div className="flex items-center justify-center">
                    <AlarmClock
                      className={cn(
                        'cursor-pointer hover:opacity-70',
                        statusColorMapper[deck.status],
                      )}
                      onClick={() => setSelectedDeckIdx(idx)}
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
          {selectedDeck && (
            <div className="mt-4 border rounded-md p-6 bg-white shadow-lg relative">
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-sm mb-4">
                  Reminder Settings - {selectedDeck.title}
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
                    checked={selectedDeck.settings.isReminderEnabled}
                    onCheckedChange={(value: boolean) =>
                      handleSettingUpdate('isReminderEnabled', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="vacation-toggle" className="text-sm">
                    Enable vacation
                  </Label>
                  <Switch
                    id="vacation-toggle"
                    checked={selectedDeck.settings.isVacationMode}
                    onCheckedChange={(value: boolean) =>
                      handleSettingUpdate('isVacationMode', value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <Label htmlFor="deadline" className="text-sm">
                    Set exam or study deadline
                  </Label>
                  <DatePicker
                    id="deadline"
                    value={
                      selectedDeck.settings.studyDeadline
                        ? new Date(selectedDeck.settings.studyDeadline)
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
                      value={
                        selectedDeck.settings.isCustomFrequency
                          ? 'custom'
                          : String(selectedDeck.settings.reminderDaysFrequency)
                      }
                      onValueChange={(value: string) => {
                        if (value === 'custom') {
                          handleSettingUpdate('isCustomFrequency', true)
                        } else {
                          handleSettingUpdate('isCustomFrequency', false)
                          handleSettingUpdate(
                            'reminderDaysFrequency',
                            Number(value),
                          )
                        }
                      }}
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
                    {selectedDeck.settings.isCustomFrequency && (
                      <>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Days"
                          value={
                            selectedDeck.settings.reminderDaysFrequency || ''
                          }
                          onChange={(e) => {
                            const val = e.target.value
                            const num = Number(val)
                            if (!Number.isNaN(num) && num > 0) {
                              handleSettingUpdate('reminderDaysFrequency', num)
                            }
                          }}
                          className="w-20"
                        />
                        <p className="text-sm text-gray-600">day(s)</p>
                      </>
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
