import React, { useState } from "react";

const RunningCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("March");
  const [currentYear, setCurrentYear] = useState(2025);

  // Mock data for the running schedule
  const runningData = [
    // Week 1
    [
      {
        date: "Feb 24",
        items: [
          {
            type: "recovery",
            title: "Recuperación activa",
            duration: "30min",
            pace: "6:41-7:20/km",
            color: "purple",
          },
        ],
      },
      {
        date: "25",
        items: [
          {
            type: "easy",
            title: "Easy Run",
            duration: "40min",
            pace: "7:25/km",
            color: "purple",
          },
        ],
      },
      {
        date: "26",
        items: [{ type: "off", title: "Day Off", rest: true, color: "orange" }],
      },
      {
        date: "27",
        items: [
          {
            type: "quality",
            title: "Quality Session",
            warmup: "15min",
            repeats: "2 times",
            details: [
              "Marathon: 8min @ 6:31/km",
              "Threshold: 4min @ 5:55/km",
              "Interval: 2min @ 5:18/km",
            ],
            color: "green",
          },
        ],
      },
      {
        date: "28",
        items: [
          {
            type: "easy",
            title: "Easy Run",
            duration: "40min",
            pace: "8:03/km",
            color: "purple",
          },
        ],
      },
      {
        date: "Mar 1",
        items: [
          {
            type: "long",
            title: "Long Run Session",
            warmup: "20min",
            details: [
              "Marathon: 15min @ 6:31/km",
              "Threshold: 10min @ 5:55/km",
              "Marathon: 10min @ 6:31/km",
              "Threshold: 10min @ 5:55/km",
            ],
            color: "green",
          },
        ],
      },
      {
        date: "2",
        items: [{ type: "off", title: "Day Off", rest: true, color: "orange" }],
      },
    ],
    // Week 2 (with additional items on some days)
    [
      {
        date: "3",
        items: [
          {
            type: "track",
            title: "Track Session",
            warmup: "15min",
            repeats: "5 times",
            details: ["Marathon: 4min @ 6:31/km", "Repetition: 2min @ 5:03/km"],
            color: "green",
          },
        ],
      },
      {
        date: "4",
        items: [
          {
            type: "easy",
            title: "Easy Run",
            duration: "40min",
            pace: "7:00/km",
            color: "purple",
          },
          {
            type: "garmin",
            title: "Garmin Training",
            duration: "42min 51sec",
            color: "gray",
          },
        ],
      },
      {
        date: "5",
        items: [{ type: "off", title: "Day Off", rest: true, color: "orange" }],
      },
      {
        date: "6",
        items: [
          {
            type: "quality",
            title: "Quality Session",
            warmup: "15min",
            repeats: "2 times",
            details: [
              "Marathon: 8min @ 6:31/km",
              "Threshold: 4min @ 5:55/km",
              "Interval: 4min @ 5:18/km",
            ],
            color: "green",
          },
        ],
      },
      {
        date: "7",
        items: [
          {
            type: "easy",
            title: "Easy Run",
            duration: "40min",
            pace: "6:49/km",
            color: "purple",
          },
        ],
      },
      {
        date: "8",
        items: [
          {
            type: "long",
            title: "Long Run Session",
            warmup: "20min",
            details: [
              "Marathon: 15min @ 6:31/km",
              "Threshold: 10min @ 5:55/km",
              "Marathon: 15min @ 6:31/km",
              "Threshold: 10min @ 5:55/km",
            ],
            color: "green",
          },
        ],
      },
      {
        date: "9",
        items: [{ type: "off", title: "Day Off", rest: true, color: "orange" }],
      },
    ],
  ];

  // First week's data for additional items
  const additionalItems = [
    {
      day: 0,
      items: [
        {
          type: "track",
          title: "Track Session",
          warmup: "15min",
          repeats: "3 times",
          details: [
            "Marathon: 5min @ 6:13/km",
            "Threshold: 3min @ 5:42/km",
            "Interval: 1min @ 5:09/km",
          ],
          color: "green",
        },
      ],
    },
    {
      day: 1,
      items: [
        {
          type: "garmin",
          title: "Garmin Training",
          duration: "45min 29sec",
          color: "gray",
        },
      ],
    },
    { day: 6, items: [] },
  ];

  // Second week's additional Garmin Training
  const secondWeekAdditional = [
    {
      day: 0,
      items: [
        {
          type: "garmin",
          title: "Garmin Training",
          duration: "40min 13sec",
          color: "gray",
        },
      ],
    },
  ];

  // Weekly totals
  const weeklyTotals = [
    { completed: 17.0, total: 38.3 },
    { completed: 36.4, total: 37.2 },
  ];

  const getColorClass = (color) => {
    switch (color) {
      case "purple":
        return "border-purple-500";
      case "orange":
        return "border-orange-400";
      case "green":
        return "border-green-500";
      case "gray":
        return "border-gray-400";
      default:
        return "border-gray-300";
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case "recovery":
      case "easy":
        return (
          <div className="w-4 h-4 flex items-center justify-center bg-purple-500 rounded-full text-white text-xs">
            -1
          </div>
        );
      case "off":
        return <div className="w-3 h-3 bg-orange-400 rounded-full"></div>;
      case "quality":
      case "track":
      case "long":
        return (
          <div className="w-4 h-4 flex items-center justify-center bg-green-500 rounded-full text-white text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "garmin":
        return (
          <div className="w-4 h-4 flex items-center justify-center bg-gray-400 rounded-full text-white text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto overflow-hidden px-10 mt-10 ">
      {/* Header Navigation */}
      <div className="flex justify-between items-center p-4">
        <button className="text-blue-50 flex items-center hover:text-blue-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>February</span>
        </button>

        <div className="text-center">
          <div className="text-sm text-neutral-50 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mx-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>2025</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mx-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold">March</h1>
        </div>

        <button className="text-blue-50 flex items-center hover:text-blue-300 cursor-pointer">
          <span>April</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* calendar */}
      <div className="rounded-lg shadow-lg">
        <div className="grid grid-cols-8 drop-shadow-sm text-center py-2 bg-neutral-400 pt-6">
          <div className="text-gray-50">Monday</div>
          <div className="text-gray-50">Tuesday</div>
          <div className="text-gray-50">Wednesday</div>
          <div className="text-gray-50">Thursday</div>
          <div className="text-gray-50">Friday</div>
          <div className="text-gray-50">Saturday</div>
          <div className="text-gray-50">Sunday</div>
          <div className="text-gray-50">Total</div>
        </div>

        {/* Show Previous Months Button */}
        <div className="text-center py-3 bg-neutral-400 drop-shadow-sm text-gray-50 hover:text-gray-800 cursor-pointer shadow-2xl">
          SHOW PREVIOUS 3 MONTHS
        </div>

        {/* Calendar Grid */}
        {runningData.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="border-b border-neutral-400">
            {/* Date Row */}
            <div className="grid grid-cols-8 border-b border-neutral-400 items-center bg-gray-200">
              {week.map((day, index) => (
                <div key={`date-${day.date}`} className="p-2 text-gray-500">
                  {day.date}
                </div>
              ))}
              <div className="p-2 flex items-center justify-center">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-xl font-bold">
                      {weeklyTotals[weekIndex].completed}km
                    </div>
                    <div className="text-xs text-gray-500">completed</div>
                    <div className="text-xs text-gray-500">
                      of {weeklyTotals[weekIndex].total}km
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="2"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#333"
                      strokeWidth="2"
                      strokeDasharray={`${
                        (weeklyTotals[weekIndex].completed /
                          weeklyTotals[weekIndex].total) *
                        100
                      } 100`}
                      strokeDashoffset="25"
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>

            {/* Activities Row */}
            <div className="grid grid-cols-8 min-h-48 bg-gray-200 py-3">
              {week.map((day, dayIndex) => (
                <div
                  key={`activity-${day.date}`}
                  className="p-2 border-r border-neutral-400 relative"
                >
                  {day.items.map((item, itemIndex) => (
                    <div
                      key={`item-${day.date}-${itemIndex}`}
                      className={`mb-2 bg-white p-2 rounded border-l-4 border-neutral-400 ${getColorClass(
                        item.color
                      )} shadow-sm`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{item.title}</div>
                        {getIconForType(item.type)}
                      </div>
                      {item.rest && (
                        <div className="text-sm text-gray-600">Rest</div>
                      )}
                      {item.duration && (
                        <div className="text-sm text-gray-600">
                          {item.duration}
                          {item.pace && ` @ ${item.pace}`}
                        </div>
                      )}
                      {item.warmup && (
                        <div className="text-sm text-gray-600">
                          {item.warmup} warmup
                        </div>
                      )}
                      {item.repeats && (
                        <div className="text-sm text-gray-600">
                          Repeat {item.repeats}:
                        </div>
                      )}
                      {item.details &&
                        item.details.map((detail, i) => (
                          <div
                            key={`detail-${i}`}
                            className="text-xs text-gray-600 ml-2"
                          >
                            {detail}
                          </div>
                        ))}
                    </div>
                  ))}

                  {/* Add additional items for specific days */}
                  {weekIndex === 0 &&
                    additionalItems.some((ai) => ai.day === dayIndex) &&
                    additionalItems
                      .find((ai) => ai.day === dayIndex)
                      .items.map((item, itemIndex) => (
                        <div
                          key={`additional-${dayIndex}-${itemIndex}`}
                          className={`mb-2 bg-white p-2 rounded border-l-4 border-neutral-400 ${getColorClass(
                            item.color
                          )} shadow-sm`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{item.title}</div>
                            {getIconForType(item.type)}
                          </div>
                          {item.duration && (
                            <div className="text-sm text-gray-600">
                              {item.duration}
                            </div>
                          )}
                          {item.warmup && (
                            <div className="text-sm text-gray-600">
                              {item.warmup} warmup
                            </div>
                          )}
                          {item.repeats && (
                            <div className="text-sm text-gray-600">
                              Repeat {item.repeats}:
                            </div>
                          )}
                          {item.details &&
                            item.details.map((detail, i) => (
                              <div
                                key={`detail-${i}`}
                                className="text-xs text-gray-600 ml-2"
                              >
                                {detail}
                              </div>
                            ))}
                        </div>
                      ))}

                  {weekIndex === 1 &&
                    secondWeekAdditional.some((ai) => ai.day === dayIndex) &&
                    secondWeekAdditional
                      .find((ai) => ai.day === dayIndex)
                      .items.map((item, itemIndex) => (
                        <div
                          key={`second-additional-${dayIndex}-${itemIndex}`}
                          className={`mb-2 bg-white p-2 rounded border-l-4 border-neutral-400${getColorClass(
                            item.color
                          )} shadow-sm`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{item.title}</div>
                            {getIconForType(item.type)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.duration}
                          </div>
                        </div>
                      ))}
                </div>
              ))}
              <div className="p-2 flex justify-center">
                <div className="flex flex-col items-center">
                  <button className="text-gray-400 hover:text-gray-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Calendar Days Header */}
    </div>
  );
};

export default RunningCalendar;
