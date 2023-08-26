import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import { countUserQuery, createUserQuery, getUserByEmailQuery, getUserByIdQuery } from '../queries/queries';
import { UserRole } from '../enums/userRoles';


export interface User {
    id: number;
    email: string;
    password: string;
    full_name: string;
    role: UserRole
}

// class UserModel {
   

    async function createUser(id: string, email: string, password: string, fullName: string, role: UserRole): Promise<void> {
        await pool.query(createUserQuery, [id, email, password, fullName, role]);
    }

    async function getUserByEmail(email: string): Promise<User | null> {
        const result: QueryResult<User> = await pool.query(getUserByEmailQuery, [email]);
        return result.rows[0] || null;
    }

    async function getUserById(id: number): Promise<User | null> {
        const result: QueryResult<User> = await pool.query(getUserByIdQuery, [id]);
        return result.rows[0] || null;
    }

    async function updateUser(id: number, email: string, fullName: string): Promise<void> {
        await pool.query('UPDATE users SET email = $1, full_name = $2 WHERE id = $3', [email, fullName, id]);
    }

    async function deleteUser(id: number): Promise<void> {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    }

    const countUsers = async (): Promise<number> => {
        const { rows } = await pool.query(countUserQuery);
        return parseInt(rows[0].count, 10);
    };

// }

export default {
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    countUsers,
};