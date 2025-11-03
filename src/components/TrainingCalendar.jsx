import { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const TrainingCalendar = () => {
  const [currentMonth] = useState(2); // March (0-indexed)
  const [currentYear] = useState(2025);

  // Mapeo de tipos de entrenamiento a colores
  const workoutTypeColors = {
    "Easy Run": "bg-purple-500",
    "Long Run": "bg-green-500",
    "Track Session": "bg-blue-500",
    "Quality Session": "bg-yellow-500",
    "Garmin Training": "bg-gray-500",
    "Day Off": "bg-orange-500",
    "Recuperación activa": "bg-indigo-500",
  };

  // Nombres de los meses
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Hardcoded calendar days for March 2025
  const calendarDays = [
    // Week 1 (February/March)
    [
      { day: 24, month: 1, year: 2025, isCurrentMonth: false },
      { day: 25, month: 1, year: 2025, isCurrentMonth: false },
      { day: 26, month: 1, year: 2025, isCurrentMonth: false },
      { day: 27, month: 1, year: 2025, isCurrentMonth: false },
      { day: 28, month: 1, year: 2025, isCurrentMonth: false },
      { day: 1, month: 2, year: 2025, isCurrentMonth: true },
      { day: 2, month: 2, year: 2025, isCurrentMonth: true },
    ],
    // Week 2
    [
      { day: 3, month: 2, year: 2025, isCurrentMonth: true },
      { day: 4, month: 2, year: 2025, isCurrentMonth: true },
      { day: 5, month: 2, year: 2025, isCurrentMonth: true },
      { day: 6, month: 2, year: 2025, isCurrentMonth: true },
      { day: 7, month: 2, year: 2025, isCurrentMonth: true },
      { day: 8, month: 2, year: 2025, isCurrentMonth: true },
      { day: 9, month: 2, year: 2025, isCurrentMonth: true },
    ],
    // Week 3
    [
      { day: 10, month: 2, year: 2025, isCurrentMonth: true },
      { day: 11, month: 2, year: 2025, isCurrentMonth: true },
      { day: 12, month: 2, year: 2025, isCurrentMonth: true },
      { day: 13, month: 2, year: 2025, isCurrentMonth: true },
      { day: 14, month: 2, year: 2025, isCurrentMonth: true },
      { day: 15, month: 2, year: 2025, isCurrentMonth: true },
      { day: 16, month: 2, year: 2025, isCurrentMonth: true },
    ],
    // Week 4
    [
      { day: 17, month: 2, year: 2025, isCurrentMonth: true },
      { day: 18, month: 2, year: 2025, isCurrentMonth: true },
      { day: 19, month: 2, year: 2025, isCurrentMonth: true },
      { day: 20, month: 2, year: 2025, isCurrentMonth: true },
      { day: 21, month: 2, year: 2025, isCurrentMonth: true },
      { day: 22, month: 2, year: 2025, isCurrentMonth: true },
      { day: 23, month: 2, year: 2025, isCurrentMonth: true },
    ],
    // Week 5
    [
      { day: 24, month: 2, year: 2025, isCurrentMonth: true },
      { day: 25, month: 2, year: 2025, isCurrentMonth: true },
      { day: 26, month: 2, year: 2025, isCurrentMonth: true },
      { day: 27, month: 2, year: 2025, isCurrentMonth: true },
      { day: 28, month: 2, year: 2025, isCurrentMonth: true },
      { day: 29, month: 2, year: 2025, isCurrentMonth: true },
      { day: 30, month: 2, year: 2025, isCurrentMonth: true },
    ],
    // Week 6 (March/April)
    [
      { day: 31, month: 2, year: 2025, isCurrentMonth: true },
      { day: 1, month: 3, year: 2025, isCurrentMonth: false },
      { day: 2, month: 3, year: 2025, isCurrentMonth: false },
      { day: 3, month: 3, year: 2025, isCurrentMonth: false },
      { day: 4, month: 3, year: 2025, isCurrentMonth: false },
      { day: 5, month: 3, year: 2025, isCurrentMonth: false },
      { day: 6, month: 3, year: 2025, isCurrentMonth: false },
    ],
  ];

  // Hardcoded weekly stats
  const weeklyStats = [
    { completed: "10.5", planned: "12.0" },
    { completed: "15.2", planned: "16.8" },
    { completed: "18.4", planned: "20.2" },
    { completed: "21.0", planned: "23.1" },
    { completed: "16.8", planned: "18.5" },
    { completed: "5.3", planned: "6.0" },
  ];

  // Hardcoded trainings
  const mockTrainings = {
    "2025-03-03": { workoutType: "Easy Run", details: "40min @ 6:30/km" },
    "2025-03-06": { workoutType: "Track Session", details: "10x400m" },
    "2025-03-09": { workoutType: "Long Run", details: "18km @ 6:00/km" },
    "2025-03-12": { workoutType: "Easy Run", details: "45min @ 6:30/km" },
    "2025-03-15": {
      workoutType: "Quality Session",
      details: "Threshold 5x1000m",
    },
    "2025-03-18": { workoutType: "Easy Run", details: "40min @ 6:30/km" },
    "2025-03-19": { workoutType: "Day Off", details: "Rest day" },
    "2025-03-21": { workoutType: "Garmin Training", details: "VO2max 6x800m" },
    "2025-03-23": { workoutType: "Long Run", details: "21km @ 5:50/km" },
    "2025-03-27": {
      workoutType: "Recuperación activa",
      details: "30min easy jog",
    },
    "2025-03-30": { workoutType: "Track Session", details: "8x200m sprints" },
  };

  // Navegar al mes anterior (just for UI, doesn't actually change the data)
  const goToPreviousMonth = () => {
    alert("Navigation functionality disabled in static version");
  };

  // Navegar al mes siguiente (just for UI, doesn't actually change the data)
  const goToNextMonth = () => {
    alert("Navigation functionality disabled in static version");
  };

  // Obtener entrenamientos para una fecha específica (simplificado)
  const getTrainingsForDate = (day) => {
    const dateString = `${day.year}-${String(day.month + 1).padStart(
      2,
      "0"
    )}-${String(day.day).padStart(2, "0")}`;
    if (mockTrainings[dateString]) {
      return [mockTrainings[dateString]];
    }
    return [];
  };

  // Determinar si un día es hoy
  const isToday = (day) => {
    const today = new Date();
    return (
      day.day === today.getDate() &&
      day.month === today.getMonth() &&
      day.year === today.getFullYear()
    );
  };

  // Componente de entrenamiento individual
  const TrainingItem = ({ training }) => {
    const colorClass = workoutTypeColors[training.workoutType] || "bg-gray-500";

    return (
      <div className={`${colorClass} rounded-lg p-2 mb-1 text-xs`}>
        <div className="font-medium">{training.workoutType}</div>
        {training.details && (
          <div className="text-xs opacity-80">{training.details}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-zinc-900/50 text-gray-200 min-h-screen p-8 mx-30 rounded-xl shadow-lg">
        <div className="max-w-6xl mx-auto">
          {/* Header del calendario */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-zinc-700"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center">
              <span className="text-xl font-semibold">
                {months[currentMonth]}
              </span>
              <span className="text-sm text-gray-400 ml-2">{currentYear}</span>
            </div>

            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-zinc-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="hidden sm:grid grid-cols-7 gap-2 mb-2">
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Monday</span>
              <span className="hidden sm:inline lg:hidden">Mon</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Tuesday</span>
              <span className="hidden sm:inline lg:hidden">Tue</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Wednesday</span>
              <span className="hidden sm:inline lg:hidden">Wed</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Thursday</span>
              <span className="hidden sm:inline lg:hidden">Thu</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Friday</span>
              <span className="hidden sm:inline lg:hidden">Fri</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Saturday</span>
              <span className="hidden sm:inline lg:hidden">Sat</span>
            </div>
            <div className="text-center text-gray-400 font-medium">
              <span className="hidden lg:inline">Sunday</span>
              <span className="hidden sm:inline lg:hidden">Sun</span>
            </div>
          </div>

          {/* Semanas */}
          {calendarDays.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="mb-4 relative">
              <div className="grid xs:grid-cols-1 sm:grid-cols-7 gap-2">
                {week.map((day, dayIndex) => {
                  const trainingsForDay = getTrainingsForDate(day);
                  const isCurrentDay = isToday(day);
                  const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

                  return (
                    <div
                      key={`day-${day.day}-${day.month}`}
                      className={`
                        ${
                          day.isCurrentMonth
                            ? "bg-zinc-800"
                            : "bg-zinc-900 text-zinc-500"
                        } 
                        ${isCurrentDay ? "border-2 border-blue-500" : ""} 
                        rounded-lg p-2 min-h-32 relative xs:flex xs:justify-between sm:block
                        `}
                    >
                      <div className="flex justify-between items-center mb-2 xs:w-1/3 sm:w-full">
                        <div className="flex items-center gap-1">
                          <span className="sm:hidden text-gray-400">{dayLetters[dayIndex]}</span>
                          <span
                            className={`${
                              isCurrentDay ? "text-blue-500 font-bold" : ""
                            }`}
                          >
                            {day.day}
                          </span>
                        </div>
                        {isCurrentDay && (
                          <span className="text-xs font-medium text-blue-500">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="overflow-y-auto max-h-28">
                        {/* Entrenamientos del día */}
                        {trainingsForDay.map((training, idx) => (
                          <TrainingItem
                            key={`training-${idx}`}
                            training={training}
                          />
                        ))}
                      </div>
                      {day.isCurrentMonth && (
                        <button>
                          <Link to={"/addActivity"}>
                            <div className="text-xs text-center text-gray-400 hover:bg-gray-500/30 p-2 rounded-md min-w-full justify-center">
                              Add activity
                            </div>
                          </Link>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Totales semanales */}
              <div className="bg-zinc-800 rounded-lg p-2 min-h-20 flex items-center justify-end mt-2">
                <div className="flex flex-col items-end xs:text-right sm:text-right">
                  <div className="text-base sm:text-lg md:text-2xl font-bold">
                    {weeklyStats[weekIndex]?.completed}km
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-400">completed</div>
                  <div className="text-[8px] sm:text-xs text-gray-500 mt-1">
                    of {weeklyStats[weekIndex]?.planned}km
                  </div>
                </div>
                <div className="ml-2 sm:ml-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 sm:border-4 border-gray-600 flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 rounded-full border-2 sm:border-4 border-blue-500"
                      style={{
                        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                        opacity: 0.7,
                      }}
                    ></div>
                    <BarChart3 size={14} className="text-gray-400 sm:hidden" />
                    <BarChart3 size={16} className="text-gray-400 hidden sm:block md:hidden" />
                    <BarChart3 size={24} className="text-gray-400 hidden md:block" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainingCalendar;
