import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock exercise data (replace later with API)
const exercisesList = [
  {
    id: 1,
    name: "Push-ups",
    muscle: "Chest, shoulders, triceps",
    category: "Upper Body",
    img: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
  },
  {
    id: 2,
    name: "Deadlifts",
    muscle: "Hamstrings, glutes, back, core",
    category: "Lower Body",
    img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
  },
  {
    id: 3,
    name: "Treadmill Running",
    muscle: "Legs, cardiovascular",
    category: "Cardio",
    img: "https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg",
  },
  {
    id: 4,
    name: "Squats",
    muscle: "Quadriceps, glutes, hamstrings",
    category: "Lower Body",
    img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CreateWorkoutPlan = () => {
  const navigate = useNavigate();

  const [plan, setPlan] = useState({
    name: "",
    time: "",
    description: "",
    duration: "",
    workoutsPerWeek: "",
    workouts: [],
    schedule: daysOfWeek.reduce((acc, d) => ({ ...acc, [d]: "Rest Day" }), {}),
  });

  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: "", exercises: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sets, setSets] = useState({});
  const [reps, setReps] = useState({});

  const handlePlanChange = (e) =>
    setPlan({ ...plan, [e.target.name]: e.target.value });

  const handleWorkoutChange = (e) =>
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });

  const filteredExercises = exercisesList.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "All" || ex.category === category)
  );

  const handleExerciseSelect = (exercise) => {
    if (newWorkout.exercises.some((e) => e.id === exercise.id)) {
      setNewWorkout({
        ...newWorkout,
        exercises: newWorkout.exercises.filter((e) => e.id !== exercise.id),
      });
    } else {
      setNewWorkout({
        ...newWorkout,
        exercises: [...newWorkout.exercises, exercise],
      });
    }
  };

  const handleCreateWorkout = () => {
    if (!newWorkout.name.trim()) {
      alert("Please enter a workout name!");
      return;
    }
    setPlan({ ...plan, workouts: [...plan.workouts, newWorkout] });
    setNewWorkout({ name: "", exercises: [] });
    setShowWorkoutForm(false);
  };

  const toggleDay = (day) => {
    setPlan({
      ...plan,
      schedule: {
        ...plan.schedule,
        [day]:
          plan.schedule[day] === "Rest Day"
            ? `Workout ${Object.keys(plan.schedule).indexOf(day) + 1}`
            : "Rest Day",
      },
    });
  };

  const handleAssign = () => alert("Plan assigned to clients!");
  const handleSave = () => {
    alert("Workout template saved!");
    navigate("/workouts");
  };

  return (
    <div className="min-h-screen border rounded-md border-gray-500 p-10 text-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Workout</h2>
        <p className="text-sm text-gray-300">
          Manage your workouts and fitness plans.
        </p>
      </div>

      {/* === PLAN DETAILS === */}
      <div className=" mb-8">
        <h3 className="text-base font-semibold mb-4">Plan Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Plan Name</label>
            <input
              name="name"
              placeholder="e.g. Full Body Strength"
              value={plan.name}
              onChange={handlePlanChange}
              className="w-full bg-white/10 px-3 py-2 rounded-lg mt-1 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Time</label>
            <input
              name="time"
              placeholder="Custom"
              value={plan.time}
              onChange={handlePlanChange}
              className="w-full bg-white/10 px-3 py-2 rounded-lg mt-1 outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm text-gray-300">Description</label>
          <textarea
            name="description"
            rows={3}
            value={plan.description}
            onChange={handlePlanChange}
            placeholder="Describe your workout plan..."
            className="w-full bg-white/10 px-3 py-2 rounded-lg mt-1 outline-none placeholder-gray-400 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm text-gray-300">Duration (weeks)</label>
            <input
              name="duration"
              type="number"
              placeholder="4"
              value={plan.duration}
              onChange={handlePlanChange}
              className="w-full bg-white/10 px-3 py-2 rounded-lg mt-1 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Workouts per Week</label>
            <input
              name="workoutsPerWeek"
              type="number"
              placeholder="3"
              value={plan.workoutsPerWeek}
              onChange={handlePlanChange}
              className="w-full bg-white/10 px-3 py-2 rounded-lg mt-1 outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* === WORKOUTS SECTION === */}
        <div className="mt-8 border p-6 rounded-md border-gray-500">
          <h4 className="font-semibold mb-3">Workouts</h4>

     {!showWorkoutForm &&
        <button
            onClick={() => setShowWorkoutForm(!showWorkoutForm)}
            className="bg-[#D08D28] hover:bg-yellow-400  text-white font-medium px-4 py-2 rounded-md transition"
          >
            + Add Workout
          </button>
     }  

          {/* === SHOW FORM ONLY WHEN BUTTON CLICKED === */}
          {showWorkoutForm && (
            <div className="mt-5 p-4 rounded-lg">
              <label className="block text-sm mb-1 text-gray-300">
                Workout Name
              </label>
              <input
                name="name"
                value={newWorkout.name}
                onChange={handleWorkoutChange}
                placeholder="e.g. Upper Body Strength"
                className="w-full bg-white/10 px-3 py-2 rounded-lg mb-4 outline-none placeholder-gray-400"
              />

              {/* Search + Filter */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-white/10 px-3 py-2 rounded-lg outline-none placeholder-gray-400"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-white/10 px-3 py-2 rounded-lg text-gray-200"
                >
                  <option className="bg-gray-700">All</option>
                  <option className="bg-gray-700">Upper Body</option>
                  <option className="bg-gray-700">Lower Body</option>
                  <option className="bg-gray-700">Cardio</option>
                </select>
              </div>

              {/* Exercise Cards */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredExercises.map((ex) => {
                  const selected = newWorkout.exercises.some(
                    (e) => e.id === ex.id
                  );
                  return (
                    <div
                      key={ex.id}
                      onClick={() => handleExerciseSelect(ex)}
                      className={`rounded-xl overflow-hidden border transition cursor-pointer ${
                        selected
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <img
                        src={ex.img}
                        alt={ex.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-sm">{ex.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">
                          {ex.muscle}
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Set"
                            value={sets[ex.id] || ""}
                            onChange={(e) =>
                              setSets({ ...sets, [ex.id]: e.target.value })
                            }
                            className="w-14 bg-white/10 rounded px-2 py-1 text-xs outline-none"
                          />
                          <input
                            type="number"
                            placeholder="Rep"
                            value={reps[ex.id] || ""}
                            onChange={(e) =>
                              setReps({ ...reps, [ex.id]: e.target.value })
                            }
                            className="w-14 bg-white/10 rounded px-2 py-1 text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Exercises */}
              {newWorkout.exercises.length > 0 && (
                <div className="mt-4 text-sm">
                  <h5 className="font-medium mb-2">Selected Exercises:</h5>
                  <div className="flex flex-wrap gap-2">
                    {newWorkout.exercises.map((ex) => (
                      <span
                        key={ex.id}
                        className="bg-white/10 rounded-lg px-3 py-1 text-xs"
                      >
                        {ex.name} — {sets[ex.id] || "3"}×{reps[ex.id] || "12"}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Create/Cancel Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setNewWorkout({ name: "", exercises: [] });
                    setShowWorkoutForm(false);
                  }}
                  className="border border-gray-500 px-5 py-2 rounded-md hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkout}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-5 py-2 rounded-md"
                >
                  Create Workout
                </button>
              </div>
            </div>
          )}

          {/* Show added workouts list */}
          {plan.workouts.length > 0 && (
           
              plan.workouts.map((w, i) => (
                <span className="px-4 py-2 ml-2 bg-[#D08D28]  text-center text-white font-medium rounded-md">
                  {w.name}
                </span>
              ))
          
          )}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="border border-gray-500 p-6 rounded-md">
        <h3 className="text-base font-semibold mb-4">Weekly Schedule</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              onClick={() => toggleDay(day)}
              className={`cursor-pointer rounded-xl border p-4 text-center transition ${
                plan.schedule[day] === "Rest Day"
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-[#D08D28]  border-green-400/30 "
              }`}
            >
              <p className="text-sm font-medium mb-1">{day}</p>
              <p className="text-xs text-gray-300">{plan.schedule[day]}</p>
              <div className="w-full place-items-center mt-3">
              <Plus />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => navigate("/workouts")}
          className="border border-gray-400/30 hover:bg-white/10 rounded-lg px-6 py-2"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          className="border border-[#D08D28] text-[#D08D28] font-medium px-6 py-2 rounded-lg"
        >
          Assign to Clients
        </button>
        <button
          onClick={handleSave}
          className="bg-[#D08D28] hover:bg-[#e4a318] text-white font-medium px-6 py-2 rounded-lg"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default CreateWorkoutPlan;
