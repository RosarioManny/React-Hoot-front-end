const show = async (hootId) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const createComment = async (hootId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    index,
    show,
    create,
    // Don't forget to export:
    createComment,
  };