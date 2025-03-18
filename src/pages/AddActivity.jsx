import React, { useState, useEffect } from "react";

const AddActivity = () => {
  const initialWorkoutState = {
    workoutName: "",
    warmUp: {
      type: "time",
      time: "",
      pace: {
        type: "easy",
        pace: "",
      },
      splits: [],
    },
    work: [
      {
        type: "distance",
        distance: "",
        unit: "km",
        time: "",
        pace: {
          type: "easy",
          pace: "",
        },
        repetitions: 1,
        splits: [],
      },
    ],
    coolDown: {
      type: "time",
      time: "",
      pace: {
        type: "easy",
        pace: "",
      },
      splits: [],
    },
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const paceTypes = [
    "easy",
    "marathon",
    "tempo",
    "threshold",
    "interval",
    "repetition",
  ];
  const distanceUnits = ["m", "km", "mi"];

  const [planDate, setPlanDate] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [workouts, setWorkouts] = useState(
    days.map((day) => ({
      day,
      workout: null,
      comment: "",
      isRestDay: false,
      newWorkout: { ...initialWorkoutState },
    }))
  );
  const [totalDistance, setTotalDistance] = useState(0);
  const [activeDay, setActiveDay] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para calcular el número de semana basado en la fecha
  useEffect(() => {
    if (planDate) {
      const date = new Date(planDate);
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
      const weekNum = Math.ceil((days + startOfYear.getDay() + 1) / 7);
      setWeekNumber(weekNum);
    }
  }, [planDate]);

  // Función para simular la obtención de entrenamientos guardados
  useEffect(() => {
    // En una aplicación real, esto vendría de una llamada a la API
    setSavedWorkouts([
      { _id: "1", workoutName: "Long Run" },
      { _id: "2", workoutName: "Easy Recovery" },
      { _id: "3", workoutName: "Tempo Run" },
      { _id: "4", workoutName: "Interval Training" },
    ]);
  }, []);

  const handleDayClick = (index) => {
    setActiveDay(activeDay === index ? null : index);
  };

  const handleWorkoutChange = (dayIndex, field, value) => {
    const updatedWorkouts = [...workouts];

    if (field === "isRestDay") {
      updatedWorkouts[dayIndex].isRestDay = value;
      if (value) {
        updatedWorkouts[dayIndex].workout = null;
        updatedWorkouts[dayIndex].newWorkout = { ...initialWorkoutState };
      }
    } else if (field === "existingWorkout") {
      updatedWorkouts[dayIndex].workout = value;
      updatedWorkouts[dayIndex].isRestDay = false;
    } else if (field === "comment") {
      updatedWorkouts[dayIndex].comment = value;
    } else {
      // Handle nested fields for new workout
      const fieldPath = field.split(".");
      let current = updatedWorkouts[dayIndex].newWorkout;

      for (let i = 0; i < fieldPath.length - 1; i++) {
        const key = fieldPath[i];

        if (key.includes("[")) {
          const arrayKey = key.split("[")[0];
          const index = parseInt(key.split("[")[1]);
          current = current[arrayKey][index];
        } else {
          current = current[key];
        }
      }

      current[fieldPath[fieldPath.length - 1]] = value;
    }

    setWorkouts(updatedWorkouts);
  };

  const addWorkSection = (dayIndex) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[dayIndex].newWorkout.work.push({
      type: "distance",
      distance: "",
      unit: "km",
      time: "",
      pace: {
        type: "easy",
        pace: "",
      },
      repetitions: 1,
      splits: [],
    });
    setWorkouts(updatedWorkouts);
  };

  const removeWorkSection = (dayIndex, workIndex) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[dayIndex].newWorkout.work.splice(workIndex, 1);
    setWorkouts(updatedWorkouts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Aquí construirías el objeto para enviar a la API
    const trainingPlanData = {
      date: planDate,
      week: weekNumber,
      workouts: workouts.map(
        ({ day, workout, comment, isRestDay, newWorkout }) => {
          if (isRestDay) {
            return {
              day,
              workout: null,
              comment: comment || ["Rest Day"],
            };
          }

          return {
            day,
            workout: workout || newWorkout, // Aquí se enviaría el ID del workout o el nuevo workout
            comment: comment ? [comment] : [],
          };
        }
      ),
      totalDistance,
    };

    console.log("Submitting data:", trainingPlanData);

    // Simulación de envío
    try {
      // Aquí iría la llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Training plan saved successfully!");
      setLoading(false);
      // Reset form or redirect
    } catch (error) {
      console.error("Error saving training plan:", error);
      alert("Error saving training plan");
      setLoading(false);
    }
  };

  const formatPaceInput = (value) => {
    // Formato mm:ss
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 2) {
      return numbers;
    }
    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
  };

  return (
    <div className="text-gray-100 min-h-screen p-10 justify-center mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Training Plan</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="w-full bg-white/20 backdrop-blur-lg border border-zinc-700 rounded-lg p-2 text-gray-100"
              value={planDate}
              onChange={(e) => setPlanDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Week Number
            </label>
            <input
              type="number"
              className="w-full bg-white/20 backdrop-blur-lg border border-zinc-700 rounded-lg p-2 text-gray-100"
              value={weekNumber}
              onChange={(e) => setWeekNumber(parseInt(e.target.value))}
              min="1"
              max="53"
              required
            />
          </div>
        </div>

        <div className="border border-zinc-700 rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-zinc-400/40 backdrop-blur-lg text-center p-2 font-medium">
            {days.map((day) => (
              <div key={day} className="text-xs md:text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 bg-zinc-500/10 backdrop-blur-lg text-center border-t border-zinc-700">
            {workouts.map((workout, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer border-r border-zinc-700 last:border-r-0 min-h-16 flex flex-col items-center justify-center ${
                  workout.isRestDay
                    ? "bg-zinc-700/10"
                    : workout.workout
                    ? "bg-blue-900"
                    : "bg-zinc-800/10"
                } ${activeDay === index ? "ring-2 ring-sky-500" : ""}`}
                onClick={() => handleDayClick(index)}
              >
                <div className="text-xs font-medium">
                  {workout.isRestDay
                    ? "REST"
                    : workout.workout
                    ? savedWorkouts.find((w) => w._id === workout.workout)
                        ?.workoutName || "Selected"
                    : workout.newWorkout.workoutName || "Add Workout"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeDay !== null && (
          <div className="bg-zinc-700 p-4 rounded-lg border border-zinc-700 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {days[activeDay]} Workout
            </h2>

            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500 rounded bg-gray-700 border-gray-600"
                  checked={workouts[activeDay].isRestDay}
                  onChange={(e) =>
                    handleWorkoutChange(
                      activeDay,
                      "isRestDay",
                      e.target.checked
                    )
                  }
                />
                <span>Rest Day</span>
              </label>
            </div>

            {!workouts[activeDay].isRestDay && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Choose Existing Workout
                    </label>
                    <select
                      className="w-full bg-zinc-100/10 border border-zinc-600 rounded-lg p-3 text-gray-100 shadow-sm"
                      value={workouts[activeDay].workout || ""}
                      onChange={(e) =>
                        handleWorkoutChange(
                          activeDay,
                          "existingWorkout",
                          e.target.value || null
                        )
                      }
                    >
                      <option value="">Create New Workout</option>
                      {savedWorkouts.map((workout) => (
                        <option key={workout._id} value={workout._id}>
                          {workout.workoutName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!workouts[activeDay].workout && (
                    <div className="space-y-6 p-6 bg-zinc-100/10 rounded-xl">
                      <h3 className="text-lg font-medium">New Workout</h3>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Workout Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-zinc-800/70 border border-zinc-600 shadow-inner rounded-lg p-2 text-gray-100"
                          value={workouts[activeDay].newWorkout.workoutName}
                          onChange={(e) =>
                            handleWorkoutChange(
                              activeDay,
                              "workoutName",
                              e.target.value
                            )
                          }
                          required={
                            !workouts[activeDay].workout &&
                            !workouts[activeDay].isRestDay
                          }
                        />
                      </div>

                      {/* Warm Up Section */}
                      <div className="p-3 bg-zinc-800/70 rounded-lg">
                        <h4 className="font-medium mb-2">Warm Up</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs mb-1">
                              Time (min)
                            </label>
                            <input
                              type="text"
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={workouts[activeDay].newWorkout.warmUp.time}
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "warmUp.time",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. 15 min"
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-1">
                              Pace Type
                            </label>
                            <select
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={
                                workouts[activeDay].newWorkout.warmUp.pace.type
                              }
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "warmUp.pace.type",
                                  e.target.value
                                )
                              }
                            >
                              {paceTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs mb-1">
                              Pace (mm:ss)
                            </label>
                            <input
                              type="text"
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={
                                workouts[activeDay].newWorkout.warmUp.pace.pace
                              }
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "warmUp.pace.pace",
                                  formatPaceInput(e.target.value)
                                )
                              }
                              placeholder="05:30"
                              maxLength="5"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Work Sections */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Work Sections</h4>
                          <button
                            type="button"
                            className="text-xs bg-sky-600 hover:bg-sky-700 text-white py-1 px-2 rounded"
                            onClick={() => addWorkSection(activeDay)}
                          >
                            + Add Section
                          </button>
                        </div>

                        {workouts[activeDay].newWorkout.work.map(
                          (section, sectionIndex) => (
                            <div
                              key={sectionIndex}
                              className="p-3 bg-zinc-800/70 rounded-lg mb-3"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="text-sm font-medium">
                                  Section {sectionIndex + 1}
                                </h5>
                                {workouts[activeDay].newWorkout.work.length >
                                  1 && (
                                  <button
                                    type="button"
                                    className="text-xs bg-red-600 hover:bg-red-700 text-white py-1 px-1 rounded"
                                    onClick={() =>
                                      removeWorkSection(activeDay, sectionIndex)
                                    }
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs mb-1">
                                    Type
                                  </label>
                                  <select
                                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                    value={section.type}
                                    onChange={(e) =>
                                      handleWorkoutChange(
                                        activeDay,
                                        `work[${sectionIndex}].type`,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="distance">Distance</option>
                                    <option value="time">Time</option>
                                  </select>
                                </div>

                                {section.type === "distance" ? (
                                  <div className="flex space-x-2">
                                    <div className="flex-grow">
                                      <label className="block text-xs mb-1">
                                        Distance
                                      </label>
                                      <input
                                        type="number"
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                        value={section.distance}
                                        onChange={(e) =>
                                          handleWorkoutChange(
                                            activeDay,
                                            `work[${sectionIndex}].distance`,
                                            e.target.value
                                          )
                                        }
                                        placeholder="5"
                                        min="0"
                                        step="0.01"
                                      />
                                    </div>
                                    <div className="w-20">
                                      <label className="block text-xs mb-1">
                                        Unit
                                      </label>
                                      <select
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                        value={section.unit}
                                        onChange={(e) =>
                                          handleWorkoutChange(
                                            activeDay,
                                            `work[${sectionIndex}].unit`,
                                            e.target.value
                                          )
                                        }
                                      >
                                        {distanceUnits.map((unit) => (
                                          <option key={unit} value={unit}>
                                            {unit}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <label className="block text-xs mb-1">
                                      Time
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                      value={section.time}
                                      onChange={(e) =>
                                        handleWorkoutChange(
                                          activeDay,
                                          `work[${sectionIndex}].time`,
                                          e.target.value
                                        )
                                      }
                                      placeholder="e.g. 30 min"
                                    />
                                  </div>
                                )}

                                <div>
                                  <label className="block text-xs mb-1">
                                    Pace Type
                                  </label>
                                  <select
                                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                    value={section.pace.type}
                                    onChange={(e) =>
                                      handleWorkoutChange(
                                        activeDay,
                                        `work[${sectionIndex}].pace.type`,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {paceTypes.map((type) => (
                                      <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() +
                                          type.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-xs mb-1">
                                    Pace (mm:ss)
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                    value={section.pace.pace}
                                    onChange={(e) =>
                                      handleWorkoutChange(
                                        activeDay,
                                        `work[${sectionIndex}].pace.pace`,
                                        formatPaceInput(e.target.value)
                                      )
                                    }
                                    placeholder="04:45"
                                    maxLength="5"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs mb-1">
                                    Repetitions
                                  </label>
                                  <input
                                    type="number"
                                    className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                                    value={section.repetitions}
                                    onChange={(e) =>
                                      handleWorkoutChange(
                                        activeDay,
                                        `work[${sectionIndex}].repetitions`,
                                        parseInt(e.target.value)
                                      )
                                    }
                                    min="1"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/* Cool Down Section */}
                      <div className="p-3 bg-zinc-800/70 rounded-lg">
                        <h4 className="font-medium mb-2">Cool Down</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs mb-1">
                              Time (min)
                            </label>
                            <input
                              type="text"
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={
                                workouts[activeDay].newWorkout.coolDown.time
                              }
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "coolDown.time",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. 10 min"
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-1">
                              Pace Type
                            </label>
                            <select
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={
                                workouts[activeDay].newWorkout.coolDown.pace
                                  .type
                              }
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "coolDown.pace.type",
                                  e.target.value
                                )
                              }
                            >
                              {paceTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs mb-1">
                              Pace (mm:ss)
                            </label>
                            <input
                              type="text"
                              className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-2 text-gray-100"
                              value={
                                workouts[activeDay].newWorkout.coolDown.pace
                                  .pace
                              }
                              onChange={(e) =>
                                handleWorkoutChange(
                                  activeDay,
                                  "coolDown.pace.pace",
                                  formatPaceInput(e.target.value)
                                )
                              }
                              placeholder="06:00"
                              maxLength="5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Comment
                  </label>
                  <textarea
                    className="w-full bg-zinc-800/70 border border-zinc-600 rounded-lg p-2 text-gray-100"
                    value={workouts[activeDay].comment}
                    onChange={(e) =>
                      handleWorkoutChange(activeDay, "comment", e.target.value)
                    }
                    rows="2"
                    maxLength="250"
                    placeholder="Add a note about this workout (optional)"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Training Plan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddActivity;
