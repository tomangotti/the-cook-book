
const postNewCollection = async (collection, userId) => {
    console.log(collection);
    console.log(userId);
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/recipe-collections/post-new-collection/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                collection
            ),
        });

        if (!response.ok) {
            throw new Error('Failed to post new collection');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default postNewCollection;