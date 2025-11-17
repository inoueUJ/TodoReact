import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Checkbox } from './components/ui/checkbox'
import { Play, Pause, RotateCcw, Plus, Trash2, Settings } from 'lucide-react'
import './App.css'

function App() {
  // Task state
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDuration, setNewTaskDuration] = useState(60) // in minutes
  const [currentTaskId, setCurrentTaskId] = useState(null)

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(25 * 60) // in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroDuration, setPomodoroDuration] = useState(25) // in minutes
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [customDuration, setCustomDuration] = useState(25)

  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Add task
  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        duration: newTaskDuration,
        completed: false,
        pomodorosNeeded: Math.ceil(newTaskDuration / pomodoroDuration),
        pomodorosCompleted: 0,
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setNewTaskDuration(60)

      // Auto-select first task if none selected
      if (currentTaskId === null) {
        setCurrentTaskId(newTask.id)
      }
    }
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
    if (currentTaskId === id) {
      setCurrentTaskId(null)
      resetTimer()
    }
  }

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Select task to work on
  const selectTask = (id) => {
    if (isRunning) {
      setIsRunning(false)
    }
    setCurrentTaskId(id)
    resetTimer()
  }

  // Timer functions
  const startTimer = () => {
    if (currentTaskId === null) {
      alert('Please select a task first!')
      return
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeRemaining(pomodoroDuration * 60)
  }, [pomodoroDuration])

  const completePomodoro = useCallback(() => {
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }

    // Update task pomodoros completed
    if (currentTaskId) {
      setTasks(prev => prev.map(task =>
        task.id === currentTaskId
          ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 }
          : task
      ))
    }

    // Show notification
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Complete!', {
        body: 'Time for a break! 🎉',
        icon: '/vite.svg'
      })
    }

    resetTimer()
  }, [currentTaskId, resetTimer])

  // Update pomodoro duration
  const updatePomodoroDuration = () => {
    setPomodoroDuration(customDuration)
    setTimeRemaining(customDuration * 60)
    setIsCustomizing(false)

    // Recalculate pomodoros needed for all tasks
    setTasks(tasks.map(task => ({
      ...task,
      pomodorosNeeded: Math.ceil(task.duration / customDuration)
    })))
  }

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completePomodoro()
            return pomodoroDuration * 60
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, pomodoroDuration, completePomodoro])

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentTask = tasks.find(t => t.id === currentTaskId)
  const progress = currentTask
    ? (currentTask.pomodorosCompleted / currentTask.pomodorosNeeded) * 100
    : 0

  return (
    <div className="min-h-screen bg-white text-black p-8">
      {/* Hidden audio element for notification */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE6ktnysF0aBjiT2e/QgTYIHWnB7+mbUhE3j9nxr18cBjiS2PDVhzgJHmnC7uyhUhI1j9nwr18dBTiR2PDWhzgJH2rB7uyhUhE2j9rwrl0dBTmQ2PDXhzkJH2rB7u2iURI2j9nwrl0dBTmP2PDWiDkJH2rA7uyhUhI2j9nwrl4dBTiR2PDVhzgJH2rA7uyhUhI2j9nwrl0dBTmQ2PDWiDkJH2rB7uyhUhE2j9rwrl4dBjiS2e/QhzcJH2rB7u2iURE2j9rwrl0dBTmP2PDWhzkJH2rB7uyhUhI1j9nwr14dBDmP2PDXiDkJH2rB7uyhUhE2j9nwrl0dBTmP2PDWiDkJH2rB7uyhUhE2j9nwrl0dBTmP2PDWhzkJH2rB7uyhUhI1j9nwr10dBTmP2PDWiDkJH2rB7uyhUhI1j9nwrl4dBTmP2PDWhzkJH2nB7uyhUhI2j9nwrl0dBTmP2PDWiDkJH2rB7uyhUhE2j9nwrl4dBTiP2PDXhzkJH2rB7uyhUhE2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhE2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhE2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI1j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI1j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI2j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI1j9nwrl4dBTmP2PDWiDkJH2rB7uyhUhI2j9nwrl4d"/>

      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Pomodoro Tasks</h1>
          <p className="text-black/60 mt-2">Focus on one task at a time</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Task Display */}
            {currentTask && (
              <div className="border-2 border-black p-8 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black/60 mb-2">Current Task</p>
                    <h2 className="text-3xl font-bold mb-4">{currentTask.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-black/60">
                      <span>{currentTask.duration} min total</span>
                      <span>•</span>
                      <span>{currentTask.pomodorosCompleted} / {currentTask.pomodorosNeeded} pomodoros</span>
                    </div>
                  </div>
                  <Checkbox
                    checked={currentTask.completed}
                    onClick={() => toggleTaskCompletion(currentTask.id)}
                  />
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Add New Task */}
            <div className="border border-black/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                    className="flex-1"
                    min="1"
                  />
                  <Button onClick={addTask} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="border border-black/20 rounded-lg overflow-hidden">
              <div className="border-b border-black/20 p-4 bg-black/5">
                <h3 className="text-lg font-semibold">All Tasks</h3>
              </div>
              <div className="divide-y divide-black/10">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center text-black/40">
                    No tasks yet. Add one to get started!
                  </div>
                ) : (
                  tasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-4 hover:bg-black/5 transition-colors cursor-pointer ${
                        currentTaskId === task.id ? 'bg-black/5 border-l-4 border-black' : ''
                      }`}
                      onClick={() => selectTask(task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Checkbox
                              checked={task.completed}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTaskCompletion(task.id)
                              }}
                            />
                            <span className={`font-medium ${task.completed ? 'line-through text-black/40' : ''}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="ml-7 text-sm text-black/60">
                            {task.duration} min • {task.pomodorosCompleted}/{task.pomodorosNeeded} pomodoros
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteTask(task.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Timer */}
          <div className="lg:col-span-1">
            <div className="border-2 border-black rounded-lg p-8 sticky top-8">
              <div className="text-center space-y-6">
                {/* Settings */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCustomizing(!isCustomizing)}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>

                {isCustomizing ? (
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Pomodoro Duration</p>
                    <Input
                      type="number"
                      value={customDuration}
                      onChange={(e) => setCustomDuration(Number(e.target.value))}
                      min="1"
                      max="120"
                      className="text-center text-lg"
                    />
                    <div className="flex gap-2">
                      <Button onClick={updatePomodoroDuration} className="flex-1">
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsCustomizing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">Pomodoro Timer</p>
                      <p className="text-7xl font-bold font-mono tracking-tight">
                        {formatTime(timeRemaining)}
                      </p>
                      <p className="text-sm text-black/40 mt-2">{pomodoroDuration} min session</p>
                    </div>

                    {/* Timer Controls */}
                    <div className="flex gap-3 justify-center">
                      {!isRunning ? (
                        <Button
                          onClick={startTimer}
                          size="lg"
                          className="flex-1"
                          disabled={!currentTask}
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Start
                        </Button>
                      ) : (
                        <Button
                          onClick={pauseTimer}
                          size="lg"
                          className="flex-1"
                        >
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button
                        onClick={resetTimer}
                        variant="outline"
                        size="lg"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </div>

                    {!currentTask && (
                      <p className="text-sm text-black/40">
                        Select a task to start the timer
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
