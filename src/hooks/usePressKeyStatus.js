import { useState, useEffect, useCallback } from 'react';

export const usePressKeyStatus = () => {
	const [stateOfPressKey, setStateOfPressKey] = useState({});
	const handleKeyUp = useCallback((e) => {
		const keyCode = e.keyCode;

		// left
		if (keyCode === 37) {
			setStateOfPressKey(state => ({
				...state,
				left: false
			}));
		}
		// right
		if (keyCode === 39) {
			setStateOfPressKey(state => ({
				...state,
				right: false
			}));
		}
		// up
		if (keyCode === 38) {
			setStateOfPressKey(state => ({
				...state,
				up: false
			}));
    }
		// down
    if (keyCode === 40) {
			setStateOfPressKey(state => ({
				...state,
				down: false
			}));
		}
	}, []);

	const handleKeyDown = useCallback((e) => {
    const keyCode = e.keyCode;

		// left
		if (keyCode === 37) {
			setStateOfPressKey(state => ({
				...state,
				left: true
			}));
		}
		// right
		if (keyCode === 39) {
			setStateOfPressKey(state => ({
				...state,
				right: true
			}));
		}
		// up
		if (keyCode === 38) {
			setStateOfPressKey(state => ({
				...state,
				up: true
			}));
    }
		// down
    if (keyCode === 40) {
			setStateOfPressKey(state => ({
				...state,
				down: true
			}));
		}
	}, []);

	useEffect(() => {
		addEventListener('keydown', e => handleKeyDown(e));
		addEventListener('keyup', e => handleKeyUp(e));
	}, []);

	return stateOfPressKey;
}
