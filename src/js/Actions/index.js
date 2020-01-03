const { API_URL } = process.env;
const headers = {
  'Content-Type': 'application/json',
};
export const get = async () => {
  const token = localStorage.getItem('note-token') || false;
  if (!token) {
    return false;
  }
  try {
    const response = await fetch(`${API_URL}note/list`, {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    });
    const status = response.statue;
    if (status === 401)  {
      return false;
    }
    const data = await response.json();
    const files = data.map(file => {
      const { name, sha } = file;
      return { name }
    });
    return files;
  } catch (err) {
    console.log(err);
  }
}

