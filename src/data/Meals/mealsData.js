export const mealPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    description: "Balanced low-calorie meal plan for sustainable weight loss",
    duration: 28,
    calories: 1400,
    macros: {
      protein: 120,
      carbs: 140,
      fats: 45
    },
    tags: ["low calorie", "High Protein", "Balanced"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-10-15"
  },
  {
    id: 2,
    name: "Muscle Gain Plan",
    description: "High-protein meal plan optimized for muscle growth",
    duration: 30,
    calories: 2500,
    macros: {
      protein: 200,
      carbs: 300,
      fats: 80
    },
    tags: ["High Protein", "High Calorie", "Muscle Building"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-10-10"
  },
  {
    id: 3,
    name: "Keto Diet Plan",
    description: "Low-carb ketogenic meal plan for fat burning",
    duration: 21,
    calories: 1800,
    macros: {
      protein: 140,
      carbs: 50,
      fats: 140
    },
    tags: ["Low Carb", "High Fat", "Keto"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-10-01"
  },
  {
    id: 4,
    name: "Balanced Nutrition Plan",
    description: "Well-rounded meal plan for overall health and wellness",
    duration: 28,
    calories: 2000,
    macros: {
      protein: 150,
      carbs: 225,
      fats: 65
    },
    tags: ["Balanced", "Moderate Calorie", "Wellness"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-09-25"
  },
  {
    id: 5,
    name: "Vegan Weight Loss",
    description: "Plant-based low-calorie meal plan",
    duration: 28,
    calories: 1400,
    macros: {
      protein: 100,
      carbs: 160,
      fats: 45
    },
    tags: ["Vegan", "Low Calorie", "Plant-Based"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-09-20"
  },
  {
    id: 6,
    name: "Mediterranean Diet",
    description: "Heart-healthy Mediterranean-style meal plan",
    duration: 30,
    calories: 1900,
    macros: {
      protein: 130,
      carbs: 200,
      fats: 75
    },
    tags: ["Mediterranean", "Heart Healthy", "Balanced"],
    assignedTo: [],
    createdBy: "Dr. Sarah Johnson",
    createdAt: "2025-09-15"
  }
];

export const foodItems = [
  // Breakfast Items
  {
    id: 1,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    category: "Protein",
    mealType: "breakfast"
  },
  {
    id: 2,
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
    category: "Vegetables",
    mealType: "breakfast"
  },
  {
    id: 3,
    name: "Sweet Potato",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    category: "Carbs",
    mealType: "breakfast"
  },
  {
    id: 4,
    name: "Brown Rice",
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fats: 0.9,
    category: "Carbs",
    mealType: "breakfast"
  },
  {
    id: 5,
    name: "Salmon",
    calories: 208,
    protein: 20,
    carbs: 0,
    fats: 13,
    category: "Protein",
    mealType: "breakfast"
  },
  {
    id: 6,
    name: "Chicken Stir Fry",
    calories: 320,
    protein: 35,
    carbs: 25,
    fats: 10,
    category: "Mixed",
    mealType: "breakfast"
  },
  // Lunch Items
  {
    id: 7,
    name: "Greek Yogurt",
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0.4,
    category: "Protein",
    mealType: "lunch"
  },
  {
    id: 8,
    name: "Quinoa",
    calories: 120,
    protein: 4.4,
    carbs: 21,
    fats: 1.9,
    category: "Carbs",
    mealType: "lunch"
  },
  {
    id: 9,
    name: "Avocado",
    calories: 160,
    protein: 2,
    carbs: 9,
    fats: 15,
    category: "Fats",
    mealType: "lunch"
  },
  {
    id: 10,
    name: "Spinach Salad",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    category: "Vegetables",
    mealType: "lunch"
  },
  // Dinner Items
  {
    id: 11,
    name: "Grilled Tilapia",
    calories: 128,
    protein: 26,
    carbs: 0,
    fats: 2.7,
    category: "Protein",
    mealType: "dinner"
  },
  {
    id: 12,
    name: "Asparagus",
    calories: 20,
    protein: 2.2,
    carbs: 3.9,
    fats: 0.2,
    category: "Vegetables",
    mealType: "dinner"
  },
  {
    id: 13,
    name: "Turkey Breast",
    calories: 135,
    protein: 30,
    carbs: 0,
    fats: 0.7,
    category: "Protein",
    mealType: "dinner"
  },
  // Snack Items
  {
    id: 14,
    name: "Almonds",
    calories: 164,
    protein: 6,
    carbs: 6,
    fats: 14,
    category: "Fats",
    mealType: "snack"
  },
  {
    id: 15,
    name: "Apple",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    category: "Fruits",
    mealType: "snack"
  },
  {
    id: 16,
    name: "Protein Shake",
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 1.5,
    category: "Protein",
    mealType: "snack"
  },
  {
    id: 17,
    name: "Carrot Sticks",
    calories: 25,
    protein: 0.6,
    carbs: 6,
    fats: 0.1,
    category: "Vegetables",
    mealType: "snack"
  }
];

export const mealTemplates = [
  {
    id: 1,
    name: "Weight Loss Plan",
    duration: 7,
    meals: {
      day1: {
        breakfast: [1, 2, 3],
        lunch: [7, 8, 9],
        dinner: [11, 12, 4],
        snack: [14]
      },
      day2: {
        breakfast: [1, 2, 3],
        lunch: [7, 8, 9],
        dinner: [5, 12, 4],
        snack: [15]
      },
      day3: {
        breakfast: [6, 3],
        lunch: [10, 8, 9],
        dinner: [13, 2, 4],
        snack: [16]
      },
      day4: {
        breakfast: [1, 2, 3],
        lunch: [7, 8, 9],
        dinner: [11, 12, 4],
        snack: [17]
      },
      day5: {
        breakfast: [5, 2, 4],
        lunch: [10, 8, 9],
        dinner: [1, 12, 3],
        snack: [14]
      },
      day6: {
        breakfast: [6, 3],
        lunch: [7, 8, 9],
        dinner: [13, 2, 4],
        snack: [15]
      },
      day7: {
        breakfast: [1, 2, 3],
        lunch: [10, 8, 9],
        dinner: [5, 12, 4],
        snack: [16]
      }
    }
  }
];
