// User Queries
export const createUserQuery: string = 'INSERT INTO users(id, email, password, full_name, role) VALUES($1, $2, $3, $4, $5)';
export const getUsers: string = 'SELECT * FROM users';
export const getUserByIdQuery: string = 'SELECT * FROM users WHERE id = $1';
export const getUserByEmailQuery: string = 'SELECT * FROM users WHERE email = $1';
export const countUserQuery = `SELECT COUNT(*) FROM users;`;
// export const deleteUser: String = 'INSERT INTO users(email, password, full_name) VALUES($1, $2, $3)';
// export const updateUser: String = 'INSERT INTO users(email, password, full_name) VALUES($1, $2, $3)';