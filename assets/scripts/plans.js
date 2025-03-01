document.addEventListener('DOMContentLoaded', function() {
    const tripForm = document.getElementById('tripForm');
    const activitiesList = document.getElementById('activitiesList');
    const scheduleBuilder = document.getElementById('scheduleBuilder');
    const viewPlanButtons = document.querySelectorAll('.view-plan');
    const modal = document.getElementById('planDetailsModal');

    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const destination = document.getElementById('destination').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        // כאן תוכל להוסיף לוגיקה לטיפול בנתונים ויצירת לוח זמנים
        updateActivities(destination);
        createSchedule(startDate, endDate);
    });

    viewPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.closest('.travel-card').classList[1];
            showPlanDetails(planType);
        });
    });

    function updateActivities(destination) {
        // לדוגמה - בעתיד זה יכול להיות מחובר ל-API
        activitiesList.innerHTML = `
            <li>Popular attractions in ${destination}</li>
            <li>Local restaurants</li>
            <li>Cultural sites</li>
            <li>Nature spots</li>
        `;
    }

    function createSchedule(start, end) {
        // לדוגמה - יצירת לוח זמנים בסיסי
        const days = getDaysBetween(new Date(start), new Date(end));
        scheduleBuilder.innerHTML = days.map(day => `
            <div class="schedule-day">
                <h4>${day}</h4>
                <ul>
                    <li>Morning: Free for activities</li>
                    <li>Afternoon: Sightseeing</li>
                    <li>Evening: Local cuisine</li>
                </ul>
            </div>
        `).join('');
    }

    function getDaysBetween(start, end) {
        const days = [];
        let current = new Date(start);
        
        while (current <= end) {
            days.push(current.toLocaleDateString());
            current.setDate(current.getDate() + 1);
        }
        
        return days;
    }

    function showPlanDetails(planType) {
        const planDetails = getTripDetails(planType);
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${planDetails.title}</h2>
                <div class="plan-overview">
                    <p class="duration">Duration: ${planDetails.duration}</p>
                    <p class="budget">Budget: ${planDetails.budget}</p>
                </div>
                <div class="itinerary">
                    <h3>Itinerary</h3>
                    ${planDetails.itinerary.map(day => `
                        <div class="day-plan">
                            <h4>${day.day}</h4>
                            <ul>
                                ${day.activities.map(activity => `
                                    <li>${activity}</li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                <div class="tips">
                    <h3>Tips</h3>
                    <ul>
                        ${planDetails.tips.map(tip => `
                            <li>${tip}</li>
                        `).join('')}
                    </ul>
                </div>
                <button class="btn close-modal">Close</button>
            </div>
        `;
        modal.style.display = 'block';

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Sample data - בעתיד זה יכול לבוא משרת
    function getTripDetails(planType) {
        // מידע לדוגמה - יש להחליף במידע אמיתי
        return {
            title: "Weekend in the North",
            duration: "2-3 days",
            budget: "2000-3000 ₪",
            itinerary: [
                {
                    day: "Day 1",
                    activities: [
                        "Morning: Arrival and check-in",
                        "Afternoon: Water activities",
                        "Evening: Dinner at local restaurant"
                    ]
                },
                // ... more days
            ],
            tips: [
                "Book accommodations in advance during peak season",
                "Bring swimming gear",
                "Check weather forecast before trip"
            ]
        };
    }
});
