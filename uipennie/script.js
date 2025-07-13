document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcomeScreen');
    const budgetScreen = document.getElementById('budgetScreen');
    const customBudgetScreen = document.getElementById('customBudgetScreen');
    const defaultBudgetScreen = document.getElementById('defaultBudgetScreen');
    
    const userNameInput = document.getElementById('userName');
    const monthlySalaryInput = document.getElementById('monthlySalary');
    const startBtn = document.getElementById('startBtn');
    
    const displayName = document.getElementById('displayName');
    const displaySalary = document.getElementById('displaySalary');
    
    const wantsAmount = document.getElementById('wantsAmount');
    const needsAmount = document.getElementById('needsAmount');
    const savingsAmount = document.getElementById('savingsAmount');
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    const calculateBtn = document.getElementById('calculateBtn');
    const customResult = document.getElementById('customResult');
    
    const restartBtn = document.getElementById('restartBtn');

    // Variables
    let monthlySalary = 0;
    let userName = '';

    // Chart instances
    let distributionPieChart;
    let customBarChart;
    let defaultBarChart;

    // Chart colors
    const chartColors = {
        wants: '#e74c3c',
        needs: '#3498db',
        savings: '#f1c40f',
        rent: '#2ecc71',
        food: '#9b59b6',
        bills: '#e67e22',
        travel: '#1abc9c',
        misc: '#34495e'
    };

    // Event Listeners
    startBtn.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        monthlySalary = parseFloat(monthlySalaryInput.value);

        if (!userName || isNaN(monthlySalary) || monthlySalary <= 0) {
            alert('Please enter valid name and salary');
            return;
        }

        displayName.textContent = userName;
        displaySalary.textContent = `₹${monthlySalary.toLocaleString()}`;
        
        // Calculate and display default distribution
        const wants = monthlySalary * 0.5;
        const needs = monthlySalary * 0.3;
        const savings = monthlySalary * 0.2;

        wantsAmount.textContent = `₹${wants.toLocaleString()}`;
        needsAmount.textContent = `₹${needs.toLocaleString()}`;
        savingsAmount.textContent = `₹${savings.toLocaleString()}`;

        // Show budget screen with animation
        welcomeScreen.style.display = 'none';
        budgetScreen.style.display = 'block';
    });

    yesBtn.addEventListener('click', () => {
        budgetScreen.style.display = 'none';
        defaultBudgetScreen.style.display = 'block';

        // Calculate and display default budget distribution
        const rent = monthlySalary * 0.2;
        const food = monthlySalary * 0.4;
        const bills = monthlySalary * 0.05;
        const travel = monthlySalary * 0.075;
        const misc = monthlySalary * 0.075;

        document.getElementById('defaultRent').textContent = `₹${rent.toLocaleString()}`;
        document.getElementById('defaultFood').textContent = `₹${food.toLocaleString()}`;
        document.getElementById('defaultBills').textContent = `₹${bills.toLocaleString()}`;
        document.getElementById('defaultTravel').textContent = `₹${travel.toLocaleString()}`;
        document.getElementById('defaultMisc').textContent = `₹${misc.toLocaleString()}`;

        // Create default budget bar chart
        createDefaultBarChart({
            rent,
            food,
            bills,
            travel,
            misc
        });
    });

    noBtn.addEventListener('click', () => {
        budgetScreen.style.display = 'none';
        customBudgetScreen.style.display = 'block';
    });

    calculateBtn.addEventListener('click', () => {
        const rent = parseFloat(document.getElementById('rent').value) || 0;
        const food = parseFloat(document.getElementById('food').value) || 0;
        const bills = parseFloat(document.getElementById('bills').value) || 0;
        const travel = parseFloat(document.getElementById('travel').value) || 0;
        const misc = parseFloat(document.getElementById('misc').value) || 0;

        const totalExpenses = rent + food + bills + travel + misc;
        const savings = monthlySalary * 0.2;
        const availableAmount = monthlySalary - savings;

        if (totalExpenses > availableAmount) {
            customResult.innerHTML = `
                <div class="error">
                    <p>Your budget preferences exceed your available amount!</p>
                    <p>Available amount: ₹${availableAmount.toLocaleString()}</p>
                    <p>Total expenses: ₹${totalExpenses.toLocaleString()}</p>
                    <p>Please adjust your expenses to fit within your budget.</p>
                </div>
            `;
        } else {
            // Create custom budget pie chart
            const ctx = document.getElementById('customBarChart').getContext('2d');
            if (customBarChart) {
                customBarChart.destroy();
            }
            customBarChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Rent', 'Food', 'Bills', 'Travel', 'Miscellaneous', 'Savings'],
                    datasets: [{
                        data: [rent, food, bills, travel, misc, savings],
                        backgroundColor: [
                            chartColors.rent,
                            chartColors.food,
                            chartColors.bills,
                            chartColors.travel,
                            chartColors.misc,
                            chartColors.savings
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Your Custom Budget Distribution'
                        }
                    }
                }
            });

            customResult.innerHTML = `
                <div class="success">
                    <h3>Your Custom Budget Distribution</h3>
                    <div class="budget-item">
                        <span class="label">Rent</span>
                        <span class="amount">₹${rent.toLocaleString()}</span>
                    </div>
                    <div class="budget-item">
                        <span class="label">Food</span>
                        <span class="amount">₹${food.toLocaleString()}</span>
                    </div>
                    <div class="budget-item">
                        <span class="label">Bills</span>
                        <span class="amount">₹${bills.toLocaleString()}</span>
                    </div>
                    <div class="budget-item">
                        <span class="label">Travel</span>
                        <span class="amount">₹${travel.toLocaleString()}</span>
                    </div>
                    <div class="budget-item">
                        <span class="label">Miscellaneous</span>
                        <span class="amount">₹${misc.toLocaleString()}</span>
                    </div>
                    <div class="budget-item total">
                        <span class="label">Total Expenses</span>
                        <span class="amount">₹${totalExpenses.toLocaleString()}</span>
                    </div>
                    <div class="budget-item savings">
                        <span class="label">Savings</span>
                        <span class="amount">₹${savings.toLocaleString()}</span>
                    </div>
                </div>
            `;
        }
    });

    restartBtn.addEventListener('click', () => {
        // Reset all screens
        welcomeScreen.style.display = 'block';
        budgetScreen.style.display = 'none';
        customBudgetScreen.style.display = 'none';
        defaultBudgetScreen.style.display = 'none';

        // Reset inputs
        userNameInput.value = '';
        monthlySalaryInput.value = '';
        document.getElementById('rent').value = '';
        document.getElementById('food').value = '';
        document.getElementById('bills').value = '';
        document.getElementById('travel').value = '';
        document.getElementById('misc').value = '';
        customResult.innerHTML = '';
    });

    // Add animation classes
    const addAnimation = (element, animation) => {
        element.classList.add(animation);
        element.addEventListener('animationend', () => {
            element.classList.remove(animation);
        }, { once: true });
    };

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            addAnimation(card, 'pulse');
        });
    });

    // Create distribution pie chart
    const createDistributionPieChart = (wants, needs, savings) => {
        const ctx = document.getElementById('distributionPieChart').getContext('2d');
        if (distributionPieChart) {
            distributionPieChart.destroy();
        }
        distributionPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Wants', 'Needs', 'Savings'],
                datasets: [{
                    data: [wants, needs, savings],
                    backgroundColor: [
                        chartColors.wants,
                        chartColors.needs,
                        chartColors.savings
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Budget Distribution'
                    }
                }
            }
        });
    };

    // Create custom budget bar chart
    const createCustomBarChart = (data) => {
        const ctx = document.getElementById('customBarChart').getContext('2d');
        if (customBarChart) {
            customBarChart.destroy();
        }
        customBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Rent', 'Food', 'Bills', 'Travel', 'Miscellaneous'],
                datasets: [{
                    label: 'Expenses',
                    data: [
                        data.rent,
                        data.food,
                        data.bills,
                        data.travel,
                        data.misc
                    ],
                    backgroundColor: [
                        chartColors.rent,
                        chartColors.food,
                        chartColors.bills,
                        chartColors.travel,
                        chartColors.misc
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Custom Budget Breakdown'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    };

    // Create default budget bar chart
    const createDefaultBarChart = (data) => {
        const ctx = document.getElementById('defaultBarChart').getContext('2d');
        if (defaultBarChart) {
            defaultBarChart.destroy();
        }
        defaultBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Rent', 'Food', 'Bills', 'Travel', 'Miscellaneous'],
                datasets: [{
                    label: 'Expenses',
                    data: [
                        data.rent,
                        data.food,
                        data.bills,
                        data.travel,
                        data.misc
                    ],
                    backgroundColor: [
                        chartColors.rent,
                        chartColors.food,
                        chartColors.bills,
                        chartColors.travel,
                        chartColors.misc
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Default Budget Breakdown'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    };
}); 