import { useState, useEffect, useCallback } from 'react';

export const usePressKeyStatus = () => {
	const [stateOfPressKey, setStateOfPressKey] = useState({});
	const handleKeyUp = useCallback((e) => {
		const keyCode = e.keyCode;

		if (keyCode === 37) {// left
			setStateOfPressKey(state => ({
				...state,
				left: false
			}));
		}
		if (keyCode === 39) {//right
			setStateOfPressKey(state => ({
				...state,
				right: false
			}));
		}
		if (keyCode === 38) {//up
			setStateOfPressKey(state => ({
				...state,
				top: false
			}));
		}
	}, []);

	const handleKeyDown = useCallback((e) => {
		const keyCode = e.keyCode;

		if (keyCode === 37) {// left
			setStateOfPressKey(state => ({
				...state,
				left: true
			}));
		}
		if (keyCode === 39) {//right
			setStateOfPressKey(state => ({
				...state,
				right: true
			}));
		}
		if (keyCode === 38) {//up
			setStateOfPressKey(state => ({
				...state,
				top: true
			}));
		}
	}, []);

	useEffect(() => {
		addEventListener('keydown', e => handleKeyDown(e));
		addEventListener('keyup', e => handleKeyUp(e));
	}, []);

	return stateOfPressKey;
}
