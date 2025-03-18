import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Info, BarChart3 } from "lucide-react";

const TrainingCalendar = ({ trainings = [], workouts = [], user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);

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

  // Días de la semana
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    generateCalendarDays();
    calculateWeeklyStats();
  }, [currentMonth, currentYear, trainings]);

  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Navegar al mes siguiente
  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Generar los días del calendario para el mes actual
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Ajustar para comenzar el lunes (en getDay: 0 es domingo, 1 es lunes)
    let firstDay = firstDayOfMonth.getDay() - 1;
    if (firstDay === -1) firstDay = 6; // Si es domingo (0), lo ajustamos a 6

    const lastDay = lastDayOfMonth.getDate();

    // Días del mes anterior
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthLastDay - firstDay + i + 1,
      month: currentMonth - 1 < 0 ? 11 : currentMonth - 1,
      year: currentMonth - 1 < 0 ? currentYear - 1 : currentYear,
      isCurrentMonth: false,
    }));

    // Días del mes actual
    const currentMonthDays = Array.from({ length: lastDay }, (_, i) => ({
      day: i + 1,
      month: currentMonth,
      year: currentYear,
      isCurrentMonth: true,
    }));

    // Completar con días del mes siguiente
    const totalCells = Math.ceil((firstDay + lastDay) / 7) * 7;
    const nextMonthDays = Array.from(
      { length: totalCells - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => ({
        day: i + 1,
        month: currentMonth + 1 > 11 ? 0 : currentMonth + 1,
        year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false,
      })
    );

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    // Organizar en semanas
    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }

    setCalendarDays(weeks);
  };

  // Calcular estadísticas semanales (distancia total)
  const calculateWeeklyStats = () => {
    if (!calendarDays.length) return;

    const stats = calendarDays.map((week) => {
      const weekStart = new Date(week[0].year, week[0].month, week[0].day);
      const weekEnd = new Date(week[6].year, week[6].month, week[6].day);

      // Sumar distancias de entrenamientos de esta semana
      const weeklyDistanceKm = trainings
        .filter((training) => {
          const trainingDate = new Date(training.date);
          return trainingDate >= weekStart && trainingDate <= weekEnd;
        })
        .reduce((total, training) => total + (training.totalDistance || 0), 0);

      return {
        completed: weeklyDistanceKm.toFixed(1),
        planned: (weeklyDistanceKm * 1.1).toFixed(1), // Ejemplo: planeado es 10% más
      };
    });

    setWeeklyStats(stats);
  };

  // Obtener entrenamientos para una fecha específica
  const getTrainingsForDate = (day) => {
    const date = new Date(day.year, day.month, day.day);

    // Filtrar entrenamientos para esta fecha
    return trainings.filter((training) => {
      const trainingDate = new Date(training.date);
      return (
        trainingDate.getDate() === date.getDate() &&
        trainingDate.getMonth() === date.getMonth() &&
        trainingDate.getFullYear() === date.getFullYear()
      );
    });
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

  // Mock de datos de entrenamiento (para demostración)
  const mockWorkoutTypes = {
    1: "Easy Run",
    2: "Long Run Session",
    3: "Track Session",
    4: "Quality Session",
    5: "Garmin Training",
    6: "Day Off",
    7: "Recuperación activa",
  };

  // Componente de entrenamiento individual
  const TrainingItem = ({ training, type }) => {
    const workoutType =
      training.workoutType ||
      mockWorkoutTypes[Math.floor(Math.random() * 7) + 1];
    const colorClass = workoutTypeColors[workoutType] || "bg-gray-500";

    return (
      <div className={`${colorClass} rounded-lg p-2 mb-1 text-xs`}>
        <div className="font-medium">{workoutType}</div>
        {training.details && (
          <div className="text-xs opacity-80">{training.details}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-zinc-900/50 text-gray-200 min-h-screen p-8 mx-30 rounded-xl shadow-lg ">
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
          <div className="grid grid-cols-7 gap-2 mb-2">
            <div className="text-center text-gray-400 font-medium">Monday</div>
            <div className="text-center text-gray-400 font-medium">Tuesday</div>
            <div className="text-center text-gray-400 font-medium">
              Wednesday
            </div>
            <div className="text-center text-gray-400 font-medium">
              Thursday
            </div>
            <div className="text-center text-gray-400 font-medium">Friday</div>
            <div className="text-center text-gray-400 font-medium">
              Saturday
            </div>
            <div className="text-center text-gray-400 font-medium">Sunday</div>

            {/* Columna de total */}
            <div className="col-span-7 text-right text-gray-400 font-medium pr-4">
              Total
            </div>
          </div>

          {/* Semanas */}
          {calendarDays.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="mb-4 relative">
              <div className="grid grid-cols-7 gap-2">
                {week.map((day, dayIndex) => {
                  const trainingsForDay = getTrainingsForDate(day);
                  const isCurrentDay = isToday(day);

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
                        rounded-lg p-2 min-h-32 relative
                        `}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`${
                            isCurrentDay ? "text-blue-500 font-bold" : ""
                          }`}
                        >
                          {day.day}
                        </span>
                        {isCurrentDay && (
                          <span className="text-xs font-medium text-blue-500">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="overflow-y-auto max-h-28">
                        {/* Entrenamientos del día */}
                        {trainingsForDay.length > 0
                          ? trainingsForDay.map((training, idx) => (
                              <TrainingItem
                                key={`training-${idx}`}
                                training={training}
                              />
                            ))
                          : // Mock data para demostración
                            day.isCurrentMonth &&
                            (day.day % 3 === 0 || day.day % 7 === 0) && (
                              <TrainingItem
                                training={{
                                  workoutType:
                                    Object.values(mockWorkoutTypes)[
                                      day.day % 7
                                    ],
                                  details: `${
                                    day.day % 3 === 0
                                      ? "40min @ 6:30/km"
                                      : "60min warm up"
                                  }`,
                                }}
                              />
                            )}
                      </div>
                    </div>
                  );
                })}

                {/* Totales semanales */}
              </div>
                <div className=" bg-zinc-800 rounded-lg p-2 min-h-20  flex items-center justify-end mt-2">
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold">
                      {weeklyStats[weekIndex]?.completed || "0.0"}km
                    </div>
                    <div className="text-sm text-gray-400">completed</div>
                    <div className="text-xs text-gray-500 mt-1">
                      of {weeklyStats[weekIndex]?.planned || "0.0"}km
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-600 flex items-center justify-center relative">
                      <div
                        className="absolute inset-0 rounded-full border-4 border-blue-500"
                        style={{
                          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                          opacity: 0.7,
                        }}
                      ></div>
                      <BarChart3 size={24} className="text-gray-400" />
                    </div>
                  </div>
                </div>
            </div>
          ))}

          {/* Control de navegación de meses */}
          {/* <div className="flex justify-center mt-6">
            <button
              onClick={() => {}}
              className="bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded-lg text-sm"
            >
              SHOW NEXT 3 MONTHS
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default TrainingCalendar;
