import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DietPlan.css';

function DietPlan() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [showResults, setShowResults] = useState(false);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [mealPlan, setMealPlan] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('dietPlanData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setWeight(data.weight || '');
      setHeight(data.height || '');
      setAge(data.age || '');
      setGender(data.gender || 'male');
      setActivityLevel(data.activityLevel || 'moderate');
      setGoal(data.goal || 'maintain');
      setUnit(data.unit || 'kg');
      setHeightUnit(data.heightUnit || 'cm');
      
      if (data.calories) {
        setCalories(data.calories);
        setProtein(data.protein);
        setCarbs(data.carbs);
        setFats(data.fats);
        setWaterIntake(data.waterIntake);
        setMealPlan(data.mealPlan || []);
        setShowResults(true);
      }
    }
  }, []);

  // Save data to localStorage
  const saveData = (data) => {
    localStorage.setItem('dietPlanData', JSON.stringify(data));
  };

  const calculateBMR = () => {
    // Convert weight to kg if in lbs
    const weightInKg = unit === 'lbs' ? weight * 0.453592 : parseFloat(weight);
    
    // Convert height to cm if in inches
    const heightInCm = heightUnit === 'in' ? height * 2.54 : parseFloat(height);
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
    
    return bmr;
  };

  const calculateTDEE = (bmr) => {
    const activityMultipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,         // Light exercise 1-3 days/week
      moderate: 1.55,       // Moderate exercise 3-5 days/week
      active: 1.725,        // Hard exercise 6-7 days/week
      veryActive: 1.9       // Very hard exercise & physical job
    };
    
    return bmr * activityMultipliers[activityLevel];
  };

  const calculateCalories = () => {
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    
    // Adjust calories based on goal
    let targetCalories;
    switch (goal) {
      case 'lose':
        targetCalories = tdee - 500; // 500 calorie deficit for weight loss
        break;
      case 'gain':
        targetCalories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default:
        targetCalories = tdee; // Maintain weight
    }
    
    return Math.round(targetCalories);
  };

  const calculateMacros = (calories) => {
    let proteinRatio, carbsRatio, fatsRatio;
    
    switch (goal) {
      case 'lose':
        proteinRatio = 0.4; // 40% protein
        carbsRatio = 0.3;   // 30% carbs
        fatsRatio = 0.3;    // 30% fats
        break;
      case 'gain':
        proteinRatio = 0.3; // 30% protein
        carbsRatio = 0.45;  // 45% carbs
        fatsRatio = 0.25;   // 25% fats
        break;
      default: // maintain
        proteinRatio = 0.3; // 30% protein
        carbsRatio = 0.4;   // 40% carbs
        fatsRatio = 0.3;    // 30% fats
    }
    
    // Protein: 4 calories per gram
    // Carbs: 4 calories per gram
    // Fats: 9 calories per gram
    const proteinGrams = Math.round((calories * proteinRatio) / 4);
    const carbsGrams = Math.round((calories * carbsRatio) / 4);
    const fatsGrams = Math.round((calories * fatsRatio) / 9);
    
    return { proteinGrams, carbsGrams, fatsGrams };
  };

  const calculateWaterIntake = () => {
    // Convert weight to kg if in lbs
    const weightInKg = unit === 'lbs' ? weight * 0.453592 : parseFloat(weight);
    
    // Basic formula: 30ml per kg of body weight
    let waterInLiters = (weightInKg * 30) / 1000;
    
    // Adjust for activity level
    if (activityLevel === 'active' || activityLevel === 'veryActive') {
      waterInLiters += 0.5; // Add 500ml for active individuals
    }
    
    return Math.round(waterInLiters * 10) / 10; // Round to 1 decimal place
  };

  const generateMealPlan = (calories, protein, carbs, fats) => {
    // Distribution of calories throughout the day
    const mealDistribution = {
      breakfast: 0.25, // 25% of daily calories
      lunch: 0.35,     // 35% of daily calories
      dinner: 0.3,     // 30% of daily calories
      snack: 0.1       // 10% of daily calories
    };
    
    // Generate meal options based on goal and macros
    const mealOptions = {
      breakfast: [
        {
          name: "Protein Oatmeal",
          description: `${Math.round(50 * mealDistribution.breakfast)}g oats cooked with water, ${Math.round(protein * mealDistribution.breakfast / 4)}g protein powder, 1 tbsp nut butter, and berries`,
          calories: Math.round(calories * mealDistribution.breakfast),
          protein: Math.round(protein * mealDistribution.breakfast),
          carbs: Math.round(carbs * mealDistribution.breakfast),
          fats: Math.round(fats * mealDistribution.breakfast)
        },
        {
          name: "Greek Yogurt Parfait",
          description: `${Math.round(200 * mealDistribution.breakfast)}g Greek yogurt with berries, ${Math.round(30 * mealDistribution.breakfast)}g granola, and honey`,
          calories: Math.round(calories * mealDistribution.breakfast),
          protein: Math.round(protein * mealDistribution.breakfast),
          carbs: Math.round(carbs * mealDistribution.breakfast),
          fats: Math.round(fats * mealDistribution.breakfast)
        },
        {
          name: "Veggie Omelette",
          description: `${Math.round(3 * mealDistribution.breakfast)} eggs with spinach, bell peppers, onions, and ${Math.round(30 * mealDistribution.breakfast)}g cheese`,
          calories: Math.round(calories * mealDistribution.breakfast),
          protein: Math.round(protein * mealDistribution.breakfast),
          carbs: Math.round(carbs * mealDistribution.breakfast),
          fats: Math.round(fats * mealDistribution.breakfast)
        }
      ],
      lunch: [
        {
          name: "Chicken Salad",
          description: `${Math.round(120 * mealDistribution.lunch)}g grilled chicken breast, mixed greens, vegetables, ${Math.round(50 * mealDistribution.lunch)}g quinoa, and olive oil dressing`,
          calories: Math.round(calories * mealDistribution.lunch),
          protein: Math.round(protein * mealDistribution.lunch),
          carbs: Math.round(carbs * mealDistribution.lunch),
          fats: Math.round(fats * mealDistribution.lunch)
        },
        {
          name: "Turkey Wrap",
          description: `Whole grain wrap with ${Math.round(100 * mealDistribution.lunch)}g turkey, avocado, lettuce, tomato, and mustard`,
          calories: Math.round(calories * mealDistribution.lunch),
          protein: Math.round(protein * mealDistribution.lunch),
          carbs: Math.round(carbs * mealDistribution.lunch),
          fats: Math.round(fats * mealDistribution.lunch)
        },
        {
          name: "Lentil Soup",
          description: `${Math.round(250 * mealDistribution.lunch)}ml lentil soup with vegetables and a side of whole grain bread`,
          calories: Math.round(calories * mealDistribution.lunch),
          protein: Math.round(protein * mealDistribution.lunch),
          carbs: Math.round(carbs * mealDistribution.lunch),
          fats: Math.round(fats * mealDistribution.lunch)
        }
      ],
      dinner: [
        {
          name: "Salmon with Vegetables",
          description: `${Math.round(150 * mealDistribution.dinner)}g baked salmon, roasted vegetables, and ${Math.round(150 * mealDistribution.dinner)}g sweet potato`,
          calories: Math.round(calories * mealDistribution.dinner),
          protein: Math.round(protein * mealDistribution.dinner),
          carbs: Math.round(carbs * mealDistribution.dinner),
          fats: Math.round(fats * mealDistribution.dinner)
        },
        {
          name: "Stir-Fry",
          description: `${Math.round(120 * mealDistribution.dinner)}g tofu or lean beef with mixed vegetables and ${Math.round(150 * mealDistribution.dinner)}g brown rice`,
          calories: Math.round(calories * mealDistribution.dinner),
          protein: Math.round(protein * mealDistribution.dinner),
          carbs: Math.round(carbs * mealDistribution.dinner),
          fats: Math.round(fats * mealDistribution.dinner)
        },
        {
          name: "Pasta with Lean Meat Sauce",
          description: `${Math.round(80 * mealDistribution.dinner)}g whole grain pasta with ${Math.round(100 * mealDistribution.dinner)}g lean ground turkey tomato sauce and vegetables`,
          calories: Math.round(calories * mealDistribution.dinner),
          protein: Math.round(protein * mealDistribution.dinner),
          carbs: Math.round(carbs * mealDistribution.dinner),
          fats: Math.round(fats * mealDistribution.dinner)
        }
      ],
      snack: [
        {
          name: "Protein Shake",
          description: `Shake with ${Math.round(30 * mealDistribution.snack)}g protein powder, banana, and almond milk`,
          calories: Math.round(calories * mealDistribution.snack),
          protein: Math.round(protein * mealDistribution.snack),
          carbs: Math.round(carbs * mealDistribution.snack),
          fats: Math.round(fats * mealDistribution.snack)
        },
        {
          name: "Greek Yogurt with Berries",
          description: `${Math.round(150 * mealDistribution.snack)}g Greek yogurt with mixed berries and a drizzle of honey`,
          calories: Math.round(calories * mealDistribution.snack),
          protein: Math.round(protein * mealDistribution.snack),
          carbs: Math.round(carbs * mealDistribution.snack),
          fats: Math.round(fats * mealDistribution.snack)
        },
        {
          name: "Nuts and Fruit",
          description: `${Math.round(30 * mealDistribution.snack)}g mixed nuts with an apple or pear`,
          calories: Math.round(calories * mealDistribution.snack),
          protein: Math.round(protein * mealDistribution.snack),
          carbs: Math.round(carbs * mealDistribution.snack),
          fats: Math.round(fats * mealDistribution.snack)
        }
      ]
    };
    
    // Randomly select meals for each category
    const randomMeal = (category) => {
      const options = mealOptions[category];
      return options[Math.floor(Math.random() * options.length)];
    };
    
    return [
      { ...randomMeal('breakfast'), type: 'Breakfast' },
      { ...randomMeal('lunch'), type: 'Lunch' },
      { ...randomMeal('dinner'), type: 'Dinner' },
      { ...randomMeal('snack'), type: 'Snack' }
    ];
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!weight || !height || !age) {
      alert('Please fill in all required fields');
      return;
    }
    
    const calculatedCalories = calculateCalories();
    const { proteinGrams, carbsGrams, fatsGrams } = calculateMacros(calculatedCalories);
    const calculatedWaterIntake = calculateWaterIntake();
    const generatedMealPlan = generateMealPlan(calculatedCalories, proteinGrams, carbsGrams, fatsGrams);
    
    setCalories(calculatedCalories);
    setProtein(proteinGrams);
    setCarbs(carbsGrams);
    setFats(fatsGrams);
    setWaterIntake(calculatedWaterIntake);
    setMealPlan(generatedMealPlan);
    setShowResults(true);
    
    // Save data to localStorage
    saveData({
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      unit,
      heightUnit,
      calories: calculatedCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fats: fatsGrams,
      waterIntake: calculatedWaterIntake,
      mealPlan: generatedMealPlan
    });
  };

  const handleRegenerateMealPlan = () => {
    const generatedMealPlan = generateMealPlan(calories, protein, carbs, fats);
    setMealPlan(generatedMealPlan);
    
    // Update localStorage
    const savedData = JSON.parse(localStorage.getItem('dietPlanData'));
    savedData.mealPlan = generatedMealPlan;
    saveData(savedData);
  };

  const handleReset = () => {
    setShowResults(false);
  };

  return (
    <div className="diet-plan-container">
      <nav>
        <div className='navbar'>
          <Link to="/home" className='title'>Serenity Steps</Link>
        </div> 
      </nav>
      <img src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Diet Plan background" id='diet-bg'/>
      
      <div className="diet-content">
        <h1 className="diet-title">Personalized Diet Plan</h1>
        
        {!showResults ? (
          <div className="calculator-container">
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="weight" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)}
                    min="1"
                    required
                  />
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="height" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                    min="1"
                    required
                  />
                  <select 
                    value={heightUnit} 
                    onChange={(e) => setHeightUnit(e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Gender</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="male" 
                      checked={gender === 'male'} 
                      onChange={() => setGender('male')}
                    />
                    Male
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="gender" 
                      value="female" 
                      checked={gender === 'female'} 
                      onChange={() => setGender('female')}
                    />
                    Female
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="activity">Activity Level</label>
                <select 
                  id="activity" 
                  value={activityLevel} 
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="veryActive">Very Active (hard exercise & physical job)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <select 
                  id="goal" 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>
              
              <button type="submit" className="calculate-button">Calculate Diet Plan</button>
            </form>
          </div>
        ) : (
          <div className="results-container">
            <div className="nutrition-summary">
              <h2>Your Daily Nutrition Summary</h2>
              
              <div className="macro-cards">
                <div className="macro-card">
                  <div className="macro-icon calories">🔥</div>
                  <h3>Calories</h3>
                  <p>{calories}</p>
                </div>
                
                <div className="macro-card">
                  <div className="macro-icon protein">🥩</div>
                  <h3>Protein</h3>
                  <p>{protein}g</p>
                </div>
                
                <div className="macro-card">
                  <div className="macro-icon carbs">🍚</div>
                  <h3>Carbs</h3>
                  <p>{carbs}g</p>
                </div>
                
                <div className="macro-card">
                  <div className="macro-icon fats">🥑</div>
                  <h3>Fats</h3>
                  <p>{fats}g</p>
                </div>
                
                <div className="macro-card">
                  <div className="macro-icon water">💧</div>
                  <h3>Water</h3>
                  <p>{waterIntake}L</p>
                </div>
              </div>
              
              <div className="goal-message">
                <h3>
                  {goal === 'lose' 
                    ? 'Weight Loss Plan' 
                    : goal === 'gain' 
                      ? 'Weight Gain Plan' 
                      : 'Weight Maintenance Plan'}
                </h3>
                <p>
                  {goal === 'lose' 
                    ? 'This plan creates a moderate calorie deficit to help you lose weight at a healthy rate of about 1 pound per week.' 
                    : goal === 'gain' 
                      ? 'This plan provides a calorie surplus to support muscle growth and healthy weight gain.' 
                      : 'This plan provides the right amount of calories to maintain your current weight while supporting your activity level.'}
                </p>
              </div>
            </div>
            
            <div className="meal-plan-section">
              <div className="meal-plan-header">
                <h2>Your Daily Meal Plan</h2>
                <button className="regenerate-button" onClick={handleRegenerateMealPlan}>
                  Regenerate Meals
                </button>
              </div>
              
              <div className="meal-cards">
                {mealPlan.map((meal, index) => (
                  <div className="meal-card" key={index}>
                    <div className="meal-header">
                      <h3>{meal.type}</h3>
                      <div className="meal-calories">{meal.calories} cal</div>
                    </div>
                    <h4>{meal.name}</h4>
                    <p className="meal-description">{meal.description}</p>
                    <div className="meal-macros">
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>F: {meal.fats}g</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="nutrition-tips">
              <h2>Nutrition Tips</h2>
              <ul>
                <li>Eat a variety of colorful fruits and vegetables to ensure you get a wide range of nutrients.</li>
                <li>Stay hydrated by drinking water throughout the day, especially before meals.</li>
                <li>Limit processed foods and focus on whole, nutrient-dense options.</li>
                <li>Eat protein with each meal to help maintain muscle mass and keep you feeling full.</li>
                <li>Don't skip meals, especially breakfast, to maintain stable energy levels throughout the day.</li>
                <li>Plan and prepare meals in advance to avoid unhealthy convenience options.</li>
              </ul>
            </div>
            
            <button className="recalculate-button" onClick={handleReset}>
              Recalculate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DietPlan;