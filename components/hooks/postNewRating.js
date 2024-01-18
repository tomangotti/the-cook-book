
const postNewRating = async ({rating}) => {
    try {
        const response = await fetch('/api/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rating),
        });

        if (!response.ok) {
            throw new Error('Failed to post new rating');
        }

        // Handle the response if needed
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// Call the function to post the new rating
postNewRating();
