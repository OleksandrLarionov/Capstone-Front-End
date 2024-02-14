export const registration = (formData) => async (dispatch) => {
	const URL = import.meta.env.VITE_REGISTER;
	const response = await fetch(URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formData),
	});
	if (response.ok) {
		const data = await response.json();
		console.log(data);
	} else {
		console.error('errore');
	}
};
