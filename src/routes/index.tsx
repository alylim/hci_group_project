import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { AlarmClock, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Window } from '@/components/window'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [vacationEnabled, setVacationEnabled] = useState(false)
  const [reminderFrequency, setReminderFrequency] = useState('1')
  const [customDays, setCustomDays] = useState('')

  const handleAlarmClick = (deckName: string) => {
    setSelectedDeck(selectedDeck === deckName ? null : deckName)
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
              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">Introduction to Python</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-green-500 cursor-pointer hover:opacity-70"
                    onClick={() => handleAlarmClick('Introduction to Python')}
                  />
                </div>
                <div className="text-center text-blue-500">0</div>
                <div className="text-center text-green-500">0</div>
                <div className="text-center text-red-500">0</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">CSE6350 - Big Data for Health</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-red-500 cursor-pointer hover:opacity-70"
                    onClick={() =>
                      handleAlarmClick('CSE6350 - Big Data for Health')
                    }
                  />
                </div>
                <div className="text-center text-blue-500">20</div>
                <div className="text-center text-green-500">10</div>
                <div className="text-center text-red-500">40</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">CS6250 - Human-Computer Interaction</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-orange-500 cursor-pointer hover:opacity-70"
                    onClick={() =>
                      handleAlarmClick('CS6250 - Human-Computer Interaction')
                    }
                  />
                </div>
                <div className="text-center text-blue-500">30</div>
                <div className="text-center text-green-500">0</div>
                <div className="text-center text-red-500">5</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">CS6737 - Knowledge-based AI</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-green-500 cursor-pointer hover:opacity-70"
                    onClick={() =>
                      handleAlarmClick('CS6737 - Knowledge-based AI')
                    }
                  />
                </div>
                <div className="text-center text-blue-500">0</div>
                <div className="text-center text-green-500">50</div>
                <div className="text-center text-red-500">0</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">Basic Japanese</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-green-500 cursor-pointer hover:opacity-70"
                    onClick={() => handleAlarmClick('Basic Japanese')}
                  />
                </div>
                <div className="text-center text-blue-500">0</div>
                <div className="text-center text-green-500">30</div>
                <div className="text-center text-red-500">0</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">Basic Korean</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-green-500 cursor-pointer hover:opacity-70"
                    onClick={() => handleAlarmClick('Basic Korean')}
                  />
                </div>
                <div className="text-center text-blue-500">0</div>
                <div className="text-center text-green-500">10</div>
                <div className="text-center text-red-500">0</div>
              </div>

              <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] text-sm py-2">
                <Link to="/review">Introduction to Logic</Link>
                <div className="flex items-center justify-center">
                  <AlarmClock
                    className="text-red-500 cursor-pointer hover:opacity-70"
                    onClick={() => handleAlarmClick('Introduction to Logic')}
                  />
                </div>
                <div className="text-center text-blue-500">5</div>
                <div className="text-center text-green-500">10</div>
                <div className="text-center text-red-500">40</div>
              </div>
            </div>
          </div>

          {/* Reminder setting options */}
          {selectedDeck && (
            <div className="mt-4 border rounded-md p-6 bg-white shadow-lg relative">
              <button
                onClick={() => setSelectedDeck(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Close reminder settings"
              >
                <X size={20} />
              </button>
              <h3 className="font-bold text-sm mb-4">
                Reminder Settings - {selectedDeck}
              </h3>
              <Separator orientation="horizontal" />

              <div className="space-y-2">
                <div className="flex items-center justify-between py-3">
                  <label htmlFor="reminder-toggle" className="text-sm">
                    Enable study reminder
                  </label>
                  <div className="flex items-center gap-2">
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
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <label htmlFor="vacation-toggle" className="text-sm">
                    Enable vacation
                  </label>
                  <div className="flex items-center gap-2">
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
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <label htmlFor="deadline" className="text-sm">
                    Set exam or study deadline
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <label htmlFor="frequency" className="text-sm">
                    Set reminder frequency
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      id="frequency"
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(e.target.value)}
                      className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">Daily</option>
                      <option value="2">Every 2 days</option>
                      <option value="3">Every 3 days</option>
                      <option value="5">Every 5 days</option>
                      <option value="7">Weekly</option>
                      <option value="custom">Custom</option>
                    </select>
                    {reminderFrequency === 'custom' && (
                      <input
                        type="number"
                        min="1"
                        placeholder="Days"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        className="border rounded-md px-3 py-1.5 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
