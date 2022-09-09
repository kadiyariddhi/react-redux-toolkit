export type RegisterSubmitForm = {
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginSubmitForm = {
	email: string;
	password: string;
};

export type AddUserForm = {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	gender: string;
	dob: string;
	password: string;
	confirmPassword: string;
}

export interface IUsers {
	_id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	address?: string;
	dob?: string;
	isActive?: boolean;
	password?: string;
}

