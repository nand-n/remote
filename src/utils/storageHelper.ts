import { NextRequest } from "next/server"

/**
 * Stores a value in session storage under a given key
 * @param key The key under which the value is stored
 * @param value The value to be stored (will be converted to a JSON string)
 */
export const setSession = (key: string, value: any): void => {
	sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Retrieves a value from session storage by key
 * @param key The key of the value to retrieve
 * @returns The parsed value from session storage, or null if not found
 */

export const getSession = <T>(key: string): T | null => {
	const item = sessionStorage.getItem(key)
	return item ? JSON.parse(item) : null
}

/**
 * Removes a value from session storage by key
 * @param key The key of the value to remove
 */
export const removeSession = (key: string): void => {
	sessionStorage.removeItem(key)
}

/**
 * Sets a cookie with a specified key, value, and optional expiration days
 * @param key The key of the cookie
 * @param value The value of the cookie
 * @param days The number of days until the cookie expires (optional)
 */
export const setCookie = (key: string, value: any, days?: number): void => {
	let expires = ""
	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = "; expires=" + date.toUTCString()
	}
	document.cookie = key + "=" + (value || "") + expires + "; path=/"
}

/**
 * Retrieves a cookie value by key from the request
 * @param key The key of the cookie to retrieve
 * @param request The NextRequest object containing the cookies
 * @returns The value of the cookie, or null if not found
 */

export const getCookie = (key: string , request:NextRequest): string | null => {
	const cookie = request.cookies.get(key);


	return cookie ? cookie.value : null;
}

/**
 * Removes a cookie by key
 * @param key The key of the cookie to remove
 */

export const removeCookie = (key: string): void => {
	document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}