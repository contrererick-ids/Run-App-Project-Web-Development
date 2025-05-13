import { Link } from "react-router-dom";
import TrainingCalendar from "../components/TrainingCalendar";
import React, { useState, useEffect } from 'react';


const Home = () => {
  /* const [trainings, setTrainings] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); */

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener el usuario actual
        const userResponse = await axios.get("/api/users/me");
        setUser(userResponse.data);

        // Obtener entrenamientos del usuario
        const trainingResponse = await axios.get("/api/training-plans");
        setTrainings(trainingResponse.data);

        // Obtener workouts del usuario
        const workoutResponse = await axios.get("/api/workouts");
        setWorkouts(workoutResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos: " + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); */

  // Transformar los datos de MongoDB al formato que espera el calendario
  /* const formatTrainingsForCalendar = () => {
    if (!trainings.length) return [];

    const formattedTrainings = [];

    trainings.forEach((plan) => {
      plan.workouts.forEach((dayWorkout) => {
        // Buscar el workout completo
        const workoutDetail = workouts.find(
          (w) => w._id === dayWorkout.workout.toString()
        );

        if (workoutDetail) {
          // Determinar la fecha del entrenamiento
          const planDate = new Date(plan.date);
          const dayIndex = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].indexOf(dayWorkout.day);

          // Crear una fecha para el día específico de la semana
          const workoutDate = new Date(planDate);
          const currentDay = workoutDate.getDay(); // 0 = Sunday, 1 = Monday, ...
          const targetDay = dayIndex + 1; // Convertir a 1 = Monday, ..., 7 = Sunday
          const daysToAdd = (targetDay - currentDay + 7) % 7;
          workoutDate.setDate(workoutDate.getDate() + daysToAdd);

          // Calcular la distancia del entrenamiento (ejemplo)
          let distance = 0;
          if (workoutDetail.work && workoutDetail.work.length) {
            workoutDetail.work.forEach((w) => {
              if (w.distance) {
                // Convertir a km si es necesario
                if (w.unit === "m") {
                  distance += w.distance / 1000;
                } else if (w.unit === "mi") {
                  distance += w.distance * 1.60934;
                } else {
                  distance += w.distance;
                }
              }
            });
          }

          formattedTrainings.push({
            date: workoutDate,
            workoutType: workoutDetail.workoutName,
            details:
              dayWorkout.comment && dayWorkout.comment.length > 0
                ? dayWorkout.comment[0]
                : "",
            distance,
            workout: workoutDetail,
          });
        }
      });
    });

    return formattedTrainings;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Cargando calendario...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        {error}
      </div>
    );
  } */

  return (
    <>
      <div className="m-4 sm:m-6 md:m-10 border-b-2 border-zinc-400/30 pb-2 sm:pb-4 flex flex-col items-center">
        <Link
          to="/profile"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-neutral-400 items-center flex justify-center"
        >
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt=""
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-start text-neutral-50 mt-4 sm:mt-6 md:mt-10">
          Welcome to Run-App
        </h1>
        <p className="text-sm sm:text-base text-start text-neutral-50 mt-1 sm:mt-2">
          Your personal running calendar
        </p>
      </div>
      <TrainingCalendar
        /* trainings={formatTrainingsForCalendar()}
        workouts={workouts}
        user={user} */
      />
    </>
  );
};
export default Home;
