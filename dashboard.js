document.addEventListener('DOMContentLoaded', () => {
    // Example of dynamic chart initialization for Food Waste
    const ctxWaste = document.getElementById('wasteChart').getContext('2d');
    new Chart(ctxWaste, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Food Waste',
                data: [10, 15, 20, 25, 30],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} kg`;
                        }
                    }
                }
            }
        }
    });

    // Example of a line chart for Active Users over time
    const ctxUsers = document.getElementById('usersChart').getContext('2d');
    new Chart(ctxUsers, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Active Users',
                data: [1000, 1100, 1200, 1300, 1400],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });

    // Example of a pie chart for Waste Categories
    const ctxCategories = document.getElementById('categoriesChart').getContext('2d');
    new Chart(ctxCategories, {
        type: 'pie',
        data: {
            labels: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat'],
            datasets: [{
                label: 'Waste Categories',
                data: [15, 25, 20, 10, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ' + context.raw + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // Example of a radar chart for Performance Metrics
    const ctxPerformance = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctxPerformance, {
        type: 'radar',
        data: {
            labels: ['Efficiency', 'Quality', 'Sustainability', 'Innovation', 'Collaboration'],
            datasets: [{
                label: 'Performance Metrics',
                data: [80, 90, 70, 85, 75],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });

    // Additional functionalities like fetching dynamic data can be added here
});
