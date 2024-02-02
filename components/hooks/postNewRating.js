
const postNewRating = async (rating) => {
    console.log(rating);
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/recipes/ratings/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                rating
            ),
        });

        if (!response.ok) {
            throw new Error('Failed to post new rating');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

export default postNewRating;
