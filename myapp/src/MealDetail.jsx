import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealById } from './Api';
import './MealDetail.css'; 

const MealDetail = () => {
    const { mealId } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (mealId) {
                setLoading(true);
                setError(null);
                try {
                    const mealData = await fetchMealById(mealId);
                    setMeal(mealData);
                } catch (err) {
                    setError('Error fetching meal details');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [mealId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="meal-detail-container">
            {meal ? (
                <div className="meal-detail-content">
                    <h1 className='meal-title'>{meal.strMeal}</h1>
                    <img className="meal-detail-image" src={meal.strMealThumb} alt={meal.strMeal} />
                    <p><strong>Category:</strong> {meal.strCategory}</p>
                    <p><strong>Area:</strong> {meal.strArea}</p>
                    <p className='meal-instruction'><strong>Instructions:</strong></p>
                    <p>{meal.strInstructions}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            return ingredient ? <li key={i}>{`${measure} ${ingredient}`}</li> : null;
                        })}
                    </ul>
                    {meal.strYoutube && <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>}
                </div>
            ) : (
                <p>No meal selected.</p>
            )}
        </div>
    );
};

export default MealDetail;
